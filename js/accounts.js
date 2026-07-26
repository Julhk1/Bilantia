/* ==========================================================================
   BILANTIA — PLAN COMPTABLE GÉNÉRAL (moteur)
   Chaque compte porte : son libellé, sa classe PCG, sa rubrique de bilan
   (pour la présentation normée), et un indicateur "contra" pour les
   comptes soustractifs (amortissements, dépréciations) qui viennent
   en déduction de l'actif brut plutôt que gonfler le passif.
   Le plan est volontairement plus large que les comptes réellement
   utilisés dans les exercices : cela permet une recherche de compte
   réaliste (anti bachotage) au lieu d'une liste pré-filtrée qui
   révèle la réponse.
   ========================================================================== */

const chartOfAccounts = {
    // ---- CLASSE 1 : COMPTES DE CAPITAUX ----
    "101": { label: "Capital Social", cls: 1, rubrique: "capitaux" },
    "104": { label: "Primes d'Émission", cls: 1, rubrique: "capitaux" },
    "106": { label: "Réserves", cls: 1, rubrique: "capitaux" },
    "120": { label: "Résultat de l'Exercice (Bénéfice)", cls: 1, rubrique: "capitaux" },
    "129": { label: "Résultat de l'Exercice (Perte)", cls: 1, rubrique: "capitaux" },
    "131": { label: "Subventions d'Investissement", cls: 1, rubrique: "capitaux" },
    "151": { label: "Provisions pour Risques et Charges", cls: 1, rubrique: "provisions" },
    "164": { label: "Emprunts Bancaires", cls: 1, rubrique: "dettes_financieres" },
    "168": { label: "Autres Dettes Financières", cls: 1, rubrique: "dettes_financieres" },

    // ---- CLASSE 2 : IMMOBILISATIONS ----
    "201": { label: "Frais d'Établissement", cls: 2, rubrique: "immo" },
    "203": { label: "Frais de Recherche & Développement", cls: 2, rubrique: "immo" },
    "205": { label: "Concessions, Brevets, Licences", cls: 2, rubrique: "immo" },
    "213": { label: "Constructions", cls: 2, rubrique: "immo" },
    "215": { label: "Matériel Industriel / Four", cls: 2, rubrique: "immo" },
    "218": { label: "Autres Immobilisations Corporelles", cls: 2, rubrique: "immo" },
    "261": { label: "Titres de Participation", cls: 2, rubrique: "immo" },
    "2803": { label: "Amortissements des Frais de R&D", cls: 2, rubrique: "immo", contra: true },
    "2805": { label: "Amortissements des Concessions/Brevets", cls: 2, rubrique: "immo", contra: true },
    "2813": { label: "Amortissements des Constructions", cls: 2, rubrique: "immo", contra: true },
    "2815": { label: "Amortissements du Matériel", cls: 2, rubrique: "immo", contra: true },
    "2818": { label: "Amortissements des Autres Immobilisations Corporelles", cls: 2, rubrique: "immo", contra: true },
    "296": { label: "Dépréciation des Titres de Participation", cls: 2, rubrique: "immo", contra: true },

    // ---- CLASSE 3 : STOCKS ----
    "311": { label: "Stock Matières Premières", cls: 3, rubrique: "circulant" },
    "321": { label: "Stock Autres Approvisionnements", cls: 3, rubrique: "circulant" },
    "331": { label: "Stock En-cours de Production", cls: 3, rubrique: "circulant" },
    "355": { label: "Stock de Produits Finis", cls: 3, rubrique: "circulant" },
    "37": { label: "Stock de Marchandises", cls: 3, rubrique: "circulant" },
    "39": { label: "Dépréciation des Stocks", cls: 3, rubrique: "circulant", contra: true },

    // ---- CLASSE 4 : TIERS ----
    "401": { label: "Fournisseurs", cls: 4, rubrique: "dettes_exploitation" },
    "403": { label: "Fournisseurs - Effets à Payer", cls: 4, rubrique: "dettes_exploitation" },
    "4088": { label: "Fournisseurs - Factures Non Parvenues", cls: 4, rubrique: "dettes_exploitation" },
    "409": { label: "Fournisseurs Débiteurs (Avances Versées)", cls: 4, rubrique: "circulant" },
    "411": { label: "Clients", cls: 4, rubrique: "circulant" },
    "413": { label: "Clients - Effets à Recevoir", cls: 4, rubrique: "circulant" },
    "416": { label: "Clients Douteux", cls: 4, rubrique: "circulant" },
    "4181": { label: "Clients - Produits Non Encore Facturés", cls: 4, rubrique: "circulant" },
    "419": { label: "Clients Créditeurs (Avances Reçues)", cls: 4, rubrique: "dettes_exploitation" },
    "421": { label: "Personnel, Rémunérations Dues", cls: 4, rubrique: "dettes_exploitation" },
    "425": { label: "Personnel, Avances et Acomptes", cls: 4, rubrique: "circulant" },
    "431": { label: "Sécurité Sociale (URSSAF)", cls: 4, rubrique: "dettes_exploitation" },
    "437": { label: "Autres Organismes Sociaux", cls: 4, rubrique: "dettes_exploitation" },
    "444": { label: "État, Impôt sur les Bénéfices", cls: 4, rubrique: "dettes_exploitation" },
    "4441": { label: "État, Acomptes d'IS", cls: 4, rubrique: "circulant" },
    "44551": { label: "TVA à Décaisser", cls: 4, rubrique: "dettes_exploitation" },
    "44566": { label: "TVA Déductible sur Biens et Services", cls: 4, rubrique: "circulant" },
    "44567": { label: "Crédit de TVA à Reporter", cls: 4, rubrique: "circulant" },
    "44571": { label: "TVA Collectée", cls: 4, rubrique: "dettes_exploitation" },
    "44586": { label: "TVA sur Factures Non Parvenues", cls: 4, rubrique: "circulant" },
    "44587": { label: "TVA sur Factures à Établir", cls: 4, rubrique: "dettes_exploitation" },
    "4486": { label: "État, Charges à Payer", cls: 4, rubrique: "dettes_exploitation" },
    "4487": { label: "État, Produits à Recevoir", cls: 4, rubrique: "circulant" },
    "486": { label: "Charges Constatées d'Avance", cls: 4, rubrique: "circulant" },
    "487": { label: "Produits Constatés d'Avance", cls: 4, rubrique: "dettes_exploitation" },
    "491": { label: "Dépréciation des Comptes Clients", cls: 4, rubrique: "circulant", contra: true },

    // ---- CLASSE 5 : FINANCIERS ----
    "512": { label: "Banque", cls: 5, rubrique: "tresorerie_actif" },
    "530": { label: "Caisse", cls: 5, rubrique: "tresorerie_actif" },
    "519": { label: "Concours Bancaires Courants", cls: 5, rubrique: "tresorerie_passif" },

    // ---- CLASSE 6 : CHARGES ----
    "601": { label: "Achats de Matières Premières", cls: 6, rubrique: "charge" },
    "6031": { label: "Variation de Stocks de Matières", cls: 6, rubrique: "charge" },
    "606": { label: "Achats Non Stockés (Fournitures, Énergie)", cls: 6, rubrique: "charge" },
    "613": { label: "Locations", cls: 6, rubrique: "charge" },
    "615": { label: "Entretien et Réparations", cls: 6, rubrique: "charge" },
    "616": { label: "Primes d'Assurance", cls: 6, rubrique: "charge" },
    "622": { label: "Honoraires (Expert-Comptable, Avocat)", cls: 6, rubrique: "charge" },
    "623": { label: "Publicité", cls: 6, rubrique: "charge" },
    "625": { label: "Déplacements, Missions", cls: 6, rubrique: "charge" },
    "626": { label: "Frais Postaux et Télécommunications", cls: 6, rubrique: "charge" },
    "627": { label: "Services Bancaires", cls: 6, rubrique: "charge" },
    "641": { label: "Salaires du Personnel", cls: 6, rubrique: "charge" },
    "645": { label: "Charges de Sécurité Sociale", cls: 6, rubrique: "charge" },
    "654": { label: "Pertes sur Créances Irrécouvrables", cls: 6, rubrique: "charge" },
    "656": { label: "Dotations aux Dépréciations", cls: 6, rubrique: "charge" },
    "661": { label: "Charges d'Intérêts", cls: 6, rubrique: "charge" },
    "666": { label: "Pertes de Change", cls: 6, rubrique: "charge" },
    "675": { label: "Valeur Nette Comptable des Actifs Cédés", cls: 6, rubrique: "charge" },
    "6811": { label: "Dotations aux Amortissements", cls: 6, rubrique: "charge" },
    "6815": { label: "Dotations aux Provisions pour Risques", cls: 6, rubrique: "charge" },
    "695": { label: "Impôts sur les Bénéfices (IS)", cls: 6, rubrique: "charge" },
    "6351": { label: "Impôts, Taxes et Versements Assimilés (CFE, CVAE)", cls: 6, rubrique: "charge" },
    "686": { label: "Dotations aux Dépréciations Financières", cls: 6, rubrique: "charge" },

    // ---- CLASSE 7 : PRODUITS ----
    "701": { label: "Ventes de Produits Finis / Prestations", cls: 7, rubrique: "produit" },
    "706": { label: "Prestations de Services", cls: 7, rubrique: "produit" },
    "713": { label: "Variation des Stocks de Produits", cls: 7, rubrique: "produit" },
    "721": { label: "Production Immobilisée", cls: 7, rubrique: "produit" },
    "758": { label: "Produits Divers de Gestion", cls: 7, rubrique: "produit" },
    "761": { label: "Produits Financiers (Intérêts)", cls: 7, rubrique: "produit" },
    "765": { label: "Escomptes Obtenus", cls: 7, rubrique: "produit" },
    "775": { label: "Produits des Cessions d'Actifs", cls: 7, rubrique: "produit" },
    "762": { label: "Revenus des Titres de Participation", cls: 7, rubrique: "produit" },
    "7816": { label: "Reprises sur Dépréciations", cls: 7, rubrique: "produit" },
    "7815": { label: "Reprises sur Provisions", cls: 7, rubrique: "produit" },
    "791": { label: "Transferts de Charges d'Exploitation", cls: 7, rubrique: "produit" }
};

// Comptes dont le solde normal se lit au CRÉDIT (classe 1 hors résultat négatif,
// classe 4 tiers "fournisseurs-like", classe 7). Utilisé pour l'affichage
// du sens dans le Grand Livre. Les comptes "contra" ont toujours un solde
// créditeur mais restent classés dans la rubrique de l'actif qu'ils réduisent.
function isCreditNormal(code) {
    const meta = chartOfAccounts[code];
    if (!meta) return false;
    if (meta.contra) return true;
    if (meta.cls === 7) return true;
    if (meta.rubrique === "capitaux" || meta.rubrique === "provisions" ||
        meta.rubrique === "dettes_financieres" || meta.rubrique === "dettes_exploitation" ||
        meta.rubrique === "tresorerie_passif") return true;
    return false;
}

function accountLabel(code) {
    const meta = chartOfAccounts[code];
    return meta ? `${code} - ${meta.label}` : code;
}

// Regroupement pour l'affichage en optgroups / recherche
const CLASS_NAMES = {
    1: "Classe 1 — Capitaux",
    2: "Classe 2 — Immobilisations",
    3: "Classe 3 — Stocks",
    4: "Classe 4 — Tiers",
    5: "Classe 5 — Financiers",
    6: "Classe 6 — Charges",
    7: "Classe 7 — Produits"
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { chartOfAccounts, accountLabel, isCreditNormal, CLASS_NAMES };
}
