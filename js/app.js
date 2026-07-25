/* ==========================================================================
   BILANTIA — MOTEUR DE SIMULATION COMPTABLE
   ========================================================================== */

let currentModule = localStorage.getItem('bt_current_module') || 'mod1';

let gameState = {
    moduleType: currentModule,
    step: 1,
    xp: 100,
    journal: [],
    balances: {},
    bonusAwardedStep: null,
    stepFactor: 1
};

/* ============================================================
   UTILITAIRES : formatage, randomisation sûre, pièces datées
   ============================================================ */

function formatFR(n) {
    const sign = n < 0 ? "-" : "";
    return sign + Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const MONEY_REGEX = /(\d{1,3}(?:[ \u00A0]\d{3})*|\d+)(\s?€)/g;

// Multiplie tous les montants (en €) d'un texte par un facteur entier sûr.
// N'affecte jamais les pourcentages, durées ou codes de compte car ceux-ci
// ne sont jamais suivis du symbole €.
function scaleText(text, factor) {
    if (factor === 1 || !text) return text;
    return text.replace(MONEY_REGEX, (match, numPart, suffix) => {
        const value = parseInt(numPart.replace(/[ \u00A0]/g, ''), 10);
        return formatFR(value * factor) + suffix;
    });
}

function scaleEntries(expectedEntries, factor) {
    const out = {};
    for (const acc in expectedEntries) {
        out[acc] = {};
        if (expectedEntries[acc].debit) out[acc].debit = expectedEntries[acc].debit * factor;
        if (expectedEntries[acc].credit) out[acc].credit = expectedEntries[acc].credit * factor;
    }
    return out;
}

// Facteur choisi aléatoirement mais toujours entier (1, 2 ou 3) : garantit que
// toute proportion HT/TVA/TTC ou remise déjà vérifiée dans le contenu original
// reste mathématiquement exacte après mise à l'échelle (aucun risque d'arrondi).
function rollFactor() {
    const pool = [1, 1, 2, 3];
    return pool[Math.floor(Math.random() * pool.length)];
}

function getPieceInfo(step) {
    const base = new Date(2026, 0, 5);
    const d = new Date(base.getTime() + (step - 1) * 9 * 24 * 3600 * 1000);
    const dateStr = d.toLocaleDateString('fr-FR');
    const piece = `OD-${currentModule.toUpperCase()}-${String(step).padStart(3, '0')}`;
    return { dateStr, piece };
}

/* ============================================================
   ACCÈS AU CONTENU (avec randomisation appliquée)
   ============================================================ */

function getRawStepData() {
    if (typeof academyScenarios === 'undefined') return null;
    const pool = academyScenarios[currentModule];
    return pool ? pool[gameState.step] : null;
}

function getActiveStepData() {
    const raw = getRawStepData();
    if (!raw) return null;
    const factor = gameState.stepFactor || 1;
    if (factor === 1) return raw;
    return {
        title: raw.title,
        theory: raw.theory,
        exercise: {
            instruction: scaleText(raw.exercise.instruction, factor),
            accountsAllowed: raw.exercise.accountsAllowed,
            expectedEntries: scaleEntries(raw.exercise.expectedEntries, factor)
        },
        explanation: { success: scaleText(raw.explanation.success, factor) }
    };
}

/* ============================================================
   ÉTAT DU JEU
   ============================================================ */

function getOrCreateBalance(code) {
    if (!gameState.balances[code]) gameState.balances[code] = { debit: 0, credit: 0 };
    return gameState.balances[code];
}

function initGame() {
    const localSave = localStorage.getItem('bt_active_save');
    if (localSave) {
        try {
            const parsed = JSON.parse(decodeURIComponent(escape(atob(localSave))));
            if (parsed && parsed.moduleType === currentModule) {
                gameState = parsed;
                if (typeof gameState.bonusAwardedStep === 'undefined') gameState.bonusAwardedStep = null;
                if (!gameState.stepFactor) gameState.stepFactor = 1;
            }
        } catch (e) { localStorage.removeItem('bt_active_save'); }
    }
    if (!gameState.stepFactor) gameState.stepFactor = rollFactor();
    populateAccountDatalist();
    setupTabs();
    const accountInput = document.getElementById('account-input');
    if (accountInput) {
        accountInput.addEventListener('input', function () {
            const code = parseAccountCode(this.value);
            document.getElementById('account-hint').innerText = code ? '✓ ' + accountLabel(code) : (this.value ? '…' : '');
        });
    }
    renderUI();
}

/* ============================================================
   RENDU PRINCIPAL
   ============================================================ */

function renderUI() {
    const stepData = getActiveStepData();

    if (!stepData) {
        let currentLevel = parseInt(localStorage.getItem('bt_highest_level')) || 1;
        if (currentModule.startsWith('mod')) {
            const modNumber = parseInt(currentModule.replace('mod', ''));
            if (modNumber === currentLevel) {
                localStorage.setItem('bt_highest_level', modNumber + 1);
            }
        }
        document.getElementById('module-title').innerText = "Certificat validé !";
        document.getElementById('step-title').innerText = "🏆 Niveau Validé !";
        document.getElementById('step-theory').innerHTML = `<p>Tu as validé avec succès l'ensemble du programme pratique de cette section.</p><br><button onclick="exitToMenu()" class="btn-main">Retourner au catalogue</button>`;
        document.getElementById('exercise-instruction').innerText = "Session terminée — consultez votre rapport d'analyse ci-dessus avant de repartir.";
        document.getElementById('account-input').value = '';
        document.getElementById('piece-strip').innerHTML = '';
        document.getElementById('xp-bar').style.width = "100%";
        renderAllViews();
        return;
    }

    const pool = academyScenarios[currentModule];
    const totalStepsInModule = Object.keys(pool).length;
    document.getElementById('module-title').innerText = `Filière : ${currentModule.toUpperCase()} | Étape ${gameState.step}/${totalStepsInModule}`;

    document.getElementById('step-title').innerText = stepData.title;
    document.getElementById('step-theory').innerHTML = stepData.theory;
    document.getElementById('exercise-instruction').innerText = `🎯 ${stepData.exercise.instruction}`;
    document.getElementById('xp-display').innerText = gameState.xp;
    document.getElementById('xp-bar').style.width = ((gameState.step - 1) * (100 / totalStepsInModule)) + "%";

    const { dateStr, piece } = getPieceInfo(gameState.step);
    document.getElementById('piece-strip').innerHTML =
        `<span>📅 ${dateStr}</span><span>🧾 Pièce n° ${piece}</span>${gameState.stepFactor > 1 ? `<span class="factor-tag">Variante ×${gameState.stepFactor}</span>` : ''}`;

    document.getElementById('account-input').value = '';
    hideError();
    renderJournalTable();
    renderAllViews();
}

function renderJournalTable() {
    const { piece } = getPieceInfo(gameState.step);
    const tbody = document.getElementById('journal-body');
    tbody.innerHTML = '';
    gameState.journal.forEach((item, index) => {
        const meta = chartOfAccounts[item.account];
        const label = meta ? meta.label : '';
        tbody.innerHTML += `<tr>
            <td><strong>${item.account}</strong> <span style="color:var(--text-faint); font-size:11px;">${label}</span></td>
            <td>${item.debit || '-'}</td>
            <td>${item.credit || '-'}</td>
            <td><button onclick="removeLine(${index})" class="btn-danger">✕</button></td>
        </tr>`;
    });
}

/* ============================================================
   SAISIE
   ============================================================ */

function populateAccountDatalist() {
    const dl = document.getElementById('account-datalist');
    if (!dl) return;
    dl.innerHTML = '';
    Object.keys(chartOfAccounts).sort().forEach(code => {
        dl.innerHTML += `<option value="${accountLabel(code)}">`;
    });
}

function parseAccountCode(raw) {
    if (!raw) return null;
    const val = raw.trim();
    const digitMatch = val.match(/^(\d+)/);
    if (digitMatch && chartOfAccounts[digitMatch[1]]) return digitMatch[1];
    if (chartOfAccounts[val]) return val;
    const lower = val.toLowerCase();
    for (const code in chartOfAccounts) {
        if (chartOfAccounts[code].label.toLowerCase() === lower) return code;
    }
    return null;
}

function handleSaisie() {
    const stepData = getActiveStepData();
    if (!stepData) return;

    const rawInput = document.getElementById('account-input').value;
    const account = parseAccountCode(rawInput);
    const debit = parseFloat(document.getElementById('input-debit').value) || 0;
    const credit = parseFloat(document.getElementById('input-credit').value) || 0;

    if (!account) {
        showError(`⚠️ Compte introuvable au plan comptable. Vérifiez le code ou le libellé saisi.`);
        return;
    }
    if (debit === 0 && credit === 0) return alert("Saisis un montant.");
    if (debit > 0 && credit > 0) return alert("Double saisie Débit/Crédit interdite sur la même ligne.");

    const expected = stepData.exercise.expectedEntries[account];
    if (!expected) {
        showError(`⚠️ Le compte ${accountLabel(account)} n'est pas cohérent pour remplir l'énoncé actuel.`);
        return;
    }

    if ((expected.debit && debit !== expected.debit) || (expected.credit && credit !== expected.credit) || (expected.debit && credit > 0) || (expected.credit && debit > 0)) {
        gameState.xp = Math.max(0, gameState.xp - 10);
        showError("❌ Erreur de sens (Débit/Crédit) ou montant erroné. Revois l'impact du flux.");
        document.getElementById('xp-display').innerText = gameState.xp;
        return;
    }

    hideError();
    gameState.journal.push({ account, debit, credit });
    const bal = getOrCreateBalance(account);
    bal.debit += debit;
    bal.credit += credit;

    document.getElementById('input-debit').value = 0;
    document.getElementById('input-credit').value = 0;
    document.getElementById('account-input').value = '';

    autoSave();
    renderJournalTable();
    renderAllViews();
}

function showError(msg) {
    const box = document.getElementById('error-message');
    box.classList.add('visible');
    box.innerText = msg;
}

function hideError() {
    const box = document.getElementById('error-message');
    box.classList.remove('visible');
}

function removeLine(index) {
    const item = gameState.journal[index];
    const bal = getOrCreateBalance(item.account);
    bal.debit -= item.debit;
    bal.credit -= item.credit;
    gameState.journal.splice(index, 1);
    autoSave();
    renderJournalTable();
    renderAllViews();
}

/* ============================================================
   TABS
   ============================================================ */

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
    });
}

/* ============================================================
   AGRÉGATION GÉNÉRIQUE (utilisée par Bilan, Résultat, Analyse)
   ============================================================ */

function computeAggregates() {
    const agg = {
        immo: 0, circulant: 0, tresorerieActif: 0,
        capitaux: 0, provisions: 0, dettesFinancieres: 0, dettesExploitation: 0, tresoreriePassif: 0,
        charges: 0, produits: 0,
        immoBrutAcquisitions: 0, cessionsActifs: 0,
        dotationsNonCash: 0, reprisesNonCash: 0,
        tvaCollectee: 0, tvaDeductible: 0,
        byRubrique: { immo: [], circulant: [], tresorerie_actif: [], capitaux: [], provisions: [], dettes_financieres: [], dettes_exploitation: [], tresorerie_passif: [] }
    };

    for (const code in gameState.balances) {
        const b = gameState.balances[code];
        if (b.debit === 0 && b.credit === 0) continue;
        const meta = chartOfAccounts[code] || { label: code, cls: 0, rubrique: 'autre' };

        if (meta.cls === 6) {
            const solde = b.debit - b.credit;
            agg.charges += solde;
            if (["6811", "656", "6815", "675"].includes(code)) agg.dotationsNonCash += solde;
            continue;
        }
        if (meta.cls === 7) {
            const solde = b.credit - b.debit;
            agg.produits += solde;
            if (["7816", "7815", "775"].includes(code)) agg.reprisesNonCash += solde;
            if (code === "775") agg.cessionsActifs += solde;
            if (code === "44571") agg.tvaCollectee += solde;
            continue;
        }
        if (code === "44571") agg.tvaCollectee += (b.credit - b.debit);
        if (code === "44566") agg.tvaDeductible += (b.debit - b.credit);

        const rubrique = meta.rubrique || 'autre';
        const isAssetSide = (rubrique === 'immo' || rubrique === 'circulant' || rubrique === 'tresorerie_actif');
        const solde = isAssetSide ? (b.debit - b.credit) : (b.credit - b.debit);

        if (solde === 0) continue;

        if (agg.byRubrique[rubrique]) agg.byRubrique[rubrique].push({ code, label: meta.label, solde });

        switch (rubrique) {
            case 'immo': agg.immo += solde; break;
            case 'circulant': agg.circulant += solde; break;
            case 'tresorerie_actif': agg.tresorerieActif += solde; break;
            case 'capitaux': agg.capitaux += solde; break;
            case 'provisions': agg.provisions += solde; break;
            case 'dettes_financieres': agg.dettesFinancieres += solde; break;
            case 'dettes_exploitation': agg.dettesExploitation += solde; break;
            case 'tresorerie_passif': agg.tresoreriePassif += solde; break;
        }

        if (meta.cls === 2 && !meta.contra) agg.immoBrutAcquisitions += Math.max(0, b.debit - b.credit);
    }

    agg.resultatNet = agg.produits - agg.charges;
    return agg;
}

function renderAllViews() {
    renderGrandLivre();
    renderBalanceGenerale();
    const agg = computeAggregates();
    renderBilanNorme(agg);
    renderCompteResultat(agg);
    renderRatios(agg);
    renderCashflow(agg);
    renderCA3(agg);
    checkSuccess();
}

/* ============================================================
   GRAND LIVRE
   ============================================================ */

function renderGrandLivre() {
    const container = document.getElementById('grandlivre-container');
    if (!container) return;

    const usedAccounts = Object.keys(gameState.balances).filter(c => {
        const b = gameState.balances[c];
        return b.debit !== 0 || b.credit !== 0;
    }).sort();

    if (usedAccounts.length === 0) {
        container.innerHTML = `<p class="empty-state">Aucun mouvement pour l'instant — passez votre première écriture dans l'onglet Saisie.</p>`;
        return;
    }

    let html = '';
    usedAccounts.forEach(code => {
        const b = gameState.balances[code];
        const meta = chartOfAccounts[code] || { label: code };
        const lines = gameState.journal.filter(j => j.account === code);
        const solde = b.debit - b.credit;
        const sideLabel = solde >= 0 ? 'Solde Débiteur' : 'Solde Créditeur';

        html += `<div class="ledger-account">
            <div class="ledger-account-header">
                <span class="ledger-code">${code}</span>
                <span class="ledger-label">${meta.label}</span>
                <span class="ledger-solde ${solde >= 0 ? 'debit' : 'credit'}">${sideLabel} : ${formatFR(Math.abs(solde))} €</span>
            </div>
            <table class="ledger-table">
                <thead><tr><th>Débit</th><th>Crédit</th></tr></thead>
                <tbody>`;
        lines.forEach(l => {
            html += `<tr><td>${l.debit ? formatFR(l.debit) + ' €' : ''}</td><td>${l.credit ? formatFR(l.credit) + ' €' : ''}</td></tr>`;
        });
        html += `</tbody>
                <tfoot><tr><td>${formatFR(b.debit)} €</td><td>${formatFR(b.credit)} €</td></tr></tfoot>
            </table>
        </div>`;
    });
    container.innerHTML = html;
}

/* ============================================================
   BALANCE GÉNÉRALE
   ============================================================ */

function renderBalanceGenerale() {
    const container = document.getElementById('balance-container');
    if (!container) return;

    const usedAccounts = Object.keys(gameState.balances).filter(c => {
        const b = gameState.balances[c];
        return b.debit !== 0 || b.credit !== 0;
    }).sort();

    if (usedAccounts.length === 0) {
        container.innerHTML = `<p class="empty-state">Aucun mouvement pour l'instant.</p>`;
        return;
    }

    let totalD = 0, totalC = 0, totalSD = 0, totalSC = 0;
    let rows = '';
    usedAccounts.forEach(code => {
        const b = gameState.balances[code];
        const meta = chartOfAccounts[code] || { label: code };
        const solde = b.debit - b.credit;
        totalD += b.debit; totalC += b.credit;
        if (solde >= 0) totalSD += solde; else totalSC += -solde;
        rows += `<tr>
            <td><strong>${code}</strong> ${meta.label}</td>
            <td>${formatFR(b.debit)}</td>
            <td>${formatFR(b.credit)}</td>
            <td>${solde >= 0 ? formatFR(solde) : ''}</td>
            <td>${solde < 0 ? formatFR(-solde) : ''}</td>
        </tr>`;
    });

    const equilibree = totalD === totalC && Math.abs(totalSD - totalSC) < 0.01;

    container.innerHTML = `
        <table class="balance-table">
            <thead><tr><th>Compte</th><th>Débit</th><th>Crédit</th><th>Solde Débiteur</th><th>Solde Créditeur</th></tr></thead>
            <tbody>${rows}</tbody>
            <tfoot><tr>
                <td>TOTAUX</td><td>${formatFR(totalD)}</td><td>${formatFR(totalC)}</td>
                <td>${formatFR(totalSD)}</td><td>${formatFR(totalSC)}</td>
            </tr></tfoot>
        </table>
        <div class="balance-check ${equilibree ? 'ok' : 'error'}">
            ${equilibree ? '✓ Balance équilibrée — Total Débit = Total Crédit' : '✗ Déséquilibre détecté'}
        </div>`;
}

/* ============================================================
   BILAN NORMÉ
   ============================================================ */

const RUBRIQUE_LABELS = {
    immo: "Actif Immobilisé",
    circulant: "Actif Circulant (Stocks, Créances)",
    tresorerie_actif: "Trésorerie",
    capitaux: "Capitaux Propres",
    provisions: "Provisions pour Risques et Charges",
    dettes_financieres: "Dettes Financières",
    dettes_exploitation: "Dettes d'Exploitation & Fiscales",
    tresorerie_passif: "Trésorerie Passive"
};

function renderRubriqueBlock(key, items, extra) {
    if (items.length === 0 && !extra) return '';
    let subtotal = items.reduce((s, i) => s + i.solde, 0);
    let rows = items.map(i => `<div class="financial-line"><span>${i.code} - ${i.label}</span><strong>${formatFR(i.solde)} €</strong></div>`).join('');
    if (extra) { rows += extra.html; subtotal += extra.value; }
    return `<div class="rubrique-block">
        <h4 class="rubrique-title">${RUBRIQUE_LABELS[key]}</h4>
        ${rows}
        <div class="financial-line rubrique-subtotal"><span>Sous-total</span><strong>${formatFR(subtotal)} €</strong></div>
    </div>`;
}

function renderBilanNorme(agg) {
    const actifContainer = document.getElementById('bilan-actif-container');
    const passifContainer = document.getElementById('bilan-passif-container');
    if (!actifContainer || !passifContainer) return;

    actifContainer.innerHTML =
        renderRubriqueBlock('immo', agg.byRubrique.immo) +
        renderRubriqueBlock('circulant', agg.byRubrique.circulant) +
        renderRubriqueBlock('tresorerie_actif', agg.byRubrique.tresorerie_actif);

    const resultExtra = agg.resultatNet !== 0 ? {
        value: agg.resultatNet,
        html: `<div class="financial-line" style="color:${agg.resultatNet >= 0 ? 'var(--emerald-bright)' : 'var(--debit-red-bright)'}"><span>${agg.resultatNet >= 0 ? '120 - Bénéfice' : '129 - Perte'} de l'exercice</span><strong>${formatFR(agg.resultatNet)} €</strong></div>`
    } : null;

    passifContainer.innerHTML =
        renderRubriqueBlock('capitaux', agg.byRubrique.capitaux, resultExtra) +
        renderRubriqueBlock('provisions', agg.byRubrique.provisions) +
        renderRubriqueBlock('dettes_financieres', agg.byRubrique.dettes_financieres) +
        renderRubriqueBlock('dettes_exploitation', agg.byRubrique.dettes_exploitation) +
        renderRubriqueBlock('tresorerie_passif', agg.byRubrique.tresorerie_passif);

    const totalActif = agg.immo + agg.circulant + agg.tresorerieActif;
    const totalPassif = agg.capitaux + agg.resultatNet + agg.provisions + agg.dettesFinancieres + agg.dettesExploitation + agg.tresoreriePassif;

    document.getElementById('total-actif').innerText = formatFR(totalActif);
    document.getElementById('total-passif').innerText = formatFR(totalPassif);
}

function renderCompteResultat(agg) {
    const chargesList = document.getElementById('charges-list');
    const produitsList = document.getElementById('produits-list');
    if (!chargesList || !produitsList) return;

    let chargesHtml = '', produitsHtml = '';
    for (const code in gameState.balances) {
        const b = gameState.balances[code];
        const meta = chartOfAccounts[code];
        if (!meta) continue;
        if (meta.cls === 6) {
            const solde = b.debit - b.credit;
            if (solde !== 0) chargesHtml += `<div class="financial-line"><span>${code} - ${meta.label}</span><strong>${formatFR(solde)} €</strong></div>`;
        } else if (meta.cls === 7) {
            const solde = b.credit - b.debit;
            if (solde !== 0) produitsHtml += `<div class="financial-line"><span>${code} - ${meta.label}</span><strong>${formatFR(solde)} €</strong></div>`;
        }
    }
    chargesList.innerHTML = chargesHtml;
    produitsList.innerHTML = produitsHtml;
    document.getElementById('total-charges').innerText = formatFR(agg.charges);
    document.getElementById('total-produits').innerText = formatFR(agg.produits);
    document.getElementById('resultat-net').innerText = formatFR(agg.resultatNet);
}

/* ============================================================
   ANALYSE : RATIOS
   ============================================================ */

function ratioCard(label, value, formula, interpretation) {
    return `<div class="ratio-card">
        <div class="ratio-label">${label}</div>
        <div class="ratio-value">${value}</div>
        <div class="ratio-formula">${formula}</div>
        <div class="ratio-interp">${interpretation}</div>
    </div>`;
}

function renderRatios(agg) {
    const container = document.getElementById('ratios-container');
    if (!container) return;

    const actifCirculantTreso = agg.circulant + agg.tresorerieActif;
    const dettesCourtTerme = agg.dettesExploitation + agg.tresoreriePassif;
    const totalPassif = agg.capitaux + agg.resultatNet + agg.provisions + agg.dettesFinancieres + agg.dettesExploitation + agg.tresoreriePassif;
    const capitauxPropres = agg.capitaux + agg.resultatNet;

    let html = '';

    if (dettesCourtTerme !== 0) {
        const liq = actifCirculantTreso / dettesCourtTerme;
        html += ratioCard("Liquidité Générale", liq.toFixed(2),
            "(Circulant + Trésorerie) / Dettes court terme",
            liq >= 1 ? "✓ L'entreprise peut couvrir ses dettes à court terme avec ses actifs liquides." : "⚠️ Actifs court terme insuffisants pour couvrir les dettes immédiates.");
    } else {
        html += ratioCard("Liquidité Générale", "N/A", "(Circulant + Trésorerie) / Dettes court terme", "Pas encore de dette court terme à comparer.");
    }

    if (totalPassif !== 0) {
        const auto = (capitauxPropres / totalPassif) * 100;
        html += ratioCard("Autonomie Financière", auto.toFixed(1) + " %",
            "Capitaux Propres / Total Bilan",
            auto >= 30 ? "✓ Structure financière saine, faible dépendance aux tiers." : "⚠️ Entreprise fortement dépendante de ses créanciers.");
    }

    if (capitauxPropres > 0 && agg.dettesFinancieres >= 0) {
        const endet = capitauxPropres !== 0 ? (agg.dettesFinancieres / capitauxPropres) * 100 : 0;
        html += ratioCard("Taux d'Endettement", endet.toFixed(1) + " %",
            "Dettes Financières / Capitaux Propres",
            endet <= 100 ? "✓ Niveau d'endettement maîtrisé." : "⚠️ Dette financière supérieure aux fonds propres — risque élevé.");
    }

    if (agg.produits !== 0) {
        const marge = (agg.resultatNet / agg.produits) * 100;
        html += ratioCard("Marge Nette", marge.toFixed(1) + " %",
            "Résultat Net / Total Produits",
            marge >= 0 ? "✓ L'activité de la période est rentable." : "⚠️ L'activité de la période est déficitaire.");
    }

    container.innerHTML = html || `<p class="empty-state">Passez quelques écritures pour générer vos premiers ratios.</p>`;
}

/* ============================================================
   ANALYSE : FLUX DE TRÉSORERIE (méthode indirecte simplifiée)
   ============================================================ */

function renderCashflow(agg) {
    const container = document.getElementById('cashflow-container');
    if (!container) return;

    const caf = agg.resultatNet + agg.dotationsNonCash - agg.reprisesNonCash;
    const deltaBFR = agg.circulant - agg.dettesExploitation;
    const fluxExploitation = caf - deltaBFR;
    const fluxInvestissement = -agg.immoBrutAcquisitions + agg.cessionsActifs;
    const capitauxApportes = agg.byRubrique.capitaux.filter(i => ["101", "104", "106", "131"].includes(i.code)).reduce((s, i) => s + i.solde, 0);
    const fluxFinancement = capitauxApportes + agg.dettesFinancieres;
    const tresorerieTheorique = fluxExploitation + fluxInvestissement + fluxFinancement;
    const tresorerieReelle = agg.tresorerieActif - agg.tresoreriePassif;
    const ecart = tresorerieTheorique - tresorerieReelle;

    container.innerHTML = `
        <div class="cashflow-line"><span>Capacité d'Autofinancement (CAF)</span><strong>${formatFR(caf)} €</strong></div>
        <div class="cashflow-line sub"><span>= Résultat Net + Dotations non décaissées − Reprises non encaissées</span></div>
        <div class="cashflow-line"><span>− Variation du BFR</span><strong>${formatFR(deltaBFR)} €</strong></div>
        <div class="cashflow-line total"><span>Flux de Trésorerie d'Exploitation</span><strong>${formatFR(fluxExploitation)} €</strong></div>
        <div class="cashflow-line total"><span>Flux de Trésorerie d'Investissement</span><strong>${formatFR(fluxInvestissement)} €</strong></div>
        <div class="cashflow-line total"><span>Flux de Trésorerie de Financement</span><strong>${formatFR(fluxFinancement)} €</strong></div>
        <hr style="border:0;border-top:1px solid var(--border-color); margin:14px 0;">
        <div class="cashflow-line grand-total"><span>Trésorerie reconstituée par le tableau de flux</span><strong>${formatFR(tresorerieTheorique)} €</strong></div>
        <div class="cashflow-line grand-total"><span>Trésorerie réelle en Banque/Caisse</span><strong>${formatFR(tresorerieReelle)} €</strong></div>
        <div class="cashflow-check ${Math.abs(ecart) < 0.5 ? 'ok' : 'warn'}">
            ${Math.abs(ecart) < 0.5 ? '✓ Le tableau de flux reconstitue exactement votre trésorerie.' : `⚠️ Écart de ${formatFR(ecart)} € — modèle simplifié (cessions/apports complexes non détaillés).`}
        </div>`;
}

/* ============================================================
   ANALYSE : APERÇU CA3 (TVA)
   ============================================================ */

function renderCA3(agg) {
    const card = document.getElementById('ca3-card');
    const container = document.getElementById('ca3-container');
    if (!card || !container) return;

    if (agg.tvaCollectee === 0 && agg.tvaDeductible === 0) {
        card.style.display = 'none';
        return;
    }
    card.style.display = 'block';

    const tvaDue = agg.tvaCollectee - agg.tvaDeductible;
    container.innerHTML = `
        <div class="ca3-line"><span>Ligne 08 — TVA collectée</span><strong>${formatFR(agg.tvaCollectee)} €</strong></div>
        <div class="ca3-line"><span>Ligne 20 — TVA déductible sur biens et services</span><strong>${formatFR(agg.tvaDeductible)} €</strong></div>
        <div class="ca3-line total"><span>Ligne 28 — ${tvaDue >= 0 ? 'TVA nette due' : 'Crédit de TVA'}</span><strong>${formatFR(Math.abs(tvaDue))} €</strong></div>`;
}

/* ============================================================
   VALIDATION DE L'ÉTAPE
   ============================================================ */

function checkSuccess() {
    const stepData = getActiveStepData();
    const successPanel = document.getElementById('success-panel');
    if (!stepData) { return; }

    const linesRequired = Object.keys(stepData.exercise.expectedEntries).length;
    let valid = true;
    for (let acc in stepData.exercise.expectedEntries) {
        const target = stepData.exercise.expectedEntries[acc];
        const match = gameState.journal.some(item =>
            item.account === acc &&
            (target.debit ? item.debit === target.debit : true) &&
            (target.credit ? item.credit === target.credit : true)
        );
        if (!match) { valid = false; break; }
    }
    if (gameState.journal.length !== linesRequired) valid = false;

    if (valid) {
        successPanel.style.display = 'block';
        document.getElementById('success-explanation').innerHTML = stepData.explanation.success;

        if (gameState.bonusAwardedStep !== gameState.step) {
            gameState.xp = Math.min(100, gameState.xp + 15);
            gameState.bonusAwardedStep = gameState.step;
            document.getElementById('xp-display').innerText = gameState.xp;
            autoSave();
        }
    } else {
        successPanel.style.display = 'none';
    }
}

/* ============================================================
   PDF — LIASSE FISCALE
   ============================================================ */

function genererLiasseFiscalePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFillColor(15, 22, 19);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(232, 199, 102);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("BILANTIA — LIASSE FISCALE", 15, 20);

    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Formulaire de synthèse pédagogique — Conforme aux normes du PCG", 15, 32);

    const totalActif = document.getElementById('total-actif').innerText + " €";
    const totalPassif = document.getElementById('total-passif').innerText + " €";
    const totalCharges = document.getElementById('total-charges').innerText + " €";
    const totalProduits = document.getElementById('total-produits').innerText + " €";
    const resultatNet = document.getElementById('resultat-net').innerText + " €";
    const moduleName = currentModule.toUpperCase();

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text(`CURSUS : ${moduleName} - ÉTAPE ${gameState.step}`, 15, 55);
    doc.setFont("Helvetica", "normal");
    doc.text(`Date d'exportation : ${new Date().toLocaleDateString()}`, 130, 55);

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 65, 180, 8, 'F');
    doc.setFont("Helvetica", "bold");
    doc.text("⚖️ BILAN COMPTABLE SIMPLIFIÉ (Patrimoine)", 18, 71);

    doc.setFont("Helvetica", "normal");
    doc.rect(15, 73, 180, 30);
    doc.line(105, 73, 105, 103);

    doc.text("TOTAL ACTIF (Emplois) :", 18, 85);
    doc.setFont("Helvetica", "bold");
    doc.text(totalActif, 70, 85);

    doc.setFont("Helvetica", "normal");
    doc.text("TOTAL PASSIF (Ressources) :", 108, 85);
    doc.setFont("Helvetica", "bold");
    doc.text(totalPassif, 165, 85);

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 115, 180, 8, 'F');
    doc.setFont("Helvetica", "bold");
    doc.text("📊 COMPTE DE RÉSULTAT (Activité de la période)", 18, 121);

    doc.setFont("Helvetica", "normal");
    doc.rect(15, 123, 180, 45);
    doc.line(15, 138, 195, 138);
    doc.line(15, 153, 195, 153);

    doc.text("Total des Charges (Classe 6) :", 18, 132);
    doc.text(totalCharges, 150, 132);

    doc.text("Total des Produits (Classe 7) :", 18, 147);
    doc.text(totalProduits, 150, 147);

    doc.setFont("Helvetica", "bold");
    doc.setTextColor(31, 138, 95);
    doc.text("RÉSULTAT NET DE L'EXERCICE :", 18, 162);
    doc.text(resultatNet, 150, 162);

    doc.rect(120, 185, 75, 30);
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.text("Visa de conformité", 123, 191);
    doc.setFont("Helvetica", "bold");
    doc.text("BILANTIA ACCREDITED", 123, 205);

    doc.setFontSize(8);
    doc.text("Ce document synthétique certifie la réussite et l'équilibre de la balance comptable de l'étudiant.", 15, 285);

    doc.save(`Liasse_Fiscale_${moduleName}_Etape_${gameState.step}.pdf`);
}

/* ============================================================
   NAVIGATION / SAUVEGARDE
   ============================================================ */

function autoSave() {
    localStorage.setItem('bt_active_save', btoa(unescape(encodeURIComponent(JSON.stringify(gameState)))));
}

function nextStep() {
    gameState.step += 1;
    gameState.journal = [];
    gameState.stepFactor = rollFactor();
    autoSave();
    renderUI();
}

function exitToMenu() {
    localStorage.removeItem('bt_active_save');
    window.location.href = 'index.html';
}

function skipStepTesting() {
    const stepData = getActiveStepData();
    if (!stepData) return;
    gameState.journal = [];
    for (let acc in stepData.exercise.expectedEntries) {
        const exp = stepData.exercise.expectedEntries[acc];
        const d = exp.debit || 0; const c = exp.credit || 0;
        gameState.journal.push({ account: acc, debit: d, credit: c });
        const bal = getOrCreateBalance(acc);
        bal.debit += d; bal.credit += c;
    }
    autoSave();
    renderJournalTable();
    renderAllViews();
}

window.onload = initGame;

/* Hooks de test automatisés (Node uniquement — inertes dans le navigateur) */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getActiveStepData, computeAggregates, getOrCreateBalance, populateAccountDatalist,
        setTestState: (mod, factor, step) => {
            currentModule = mod;
            gameState = { moduleType: mod, step: step, xp: 100, journal: [], balances: {}, bonusAwardedStep: null, stepFactor: factor };
        },
        getGameState: () => gameState
    };
}
