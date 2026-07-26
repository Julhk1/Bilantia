const academyScenarios = {
    // ==========================================
    // MODULE 1 : LES FONDATIONS COMPTABLES (CURSUS COMPLET)
    // ==========================================
    mod1: {
        1: {
            title: "Étape 1 : L'Entité Économique & L'Équilibre du Bilan",
            theory: "La comptabilité sert à traduire l'histoire économique d'une entité. Tout commence par le <strong>Bilan</strong>, une photographie financière du patrimoine de l'entreprise à un instant donné. Il est divisé en deux colonnes qui s'équilibrent toujours : le <strong>Passif</strong> (à droite) qui indique l'origine de l'argent (qui a apporté les fonds : associés, banques) et l'<strong>Actif</strong> (à gauche) qui montre l'emploi concret de cet argent (où est stocké le cash : en banque, dans des machines). L'équation absolue est : Actif = Passif.",
            exercise: {
                instruction: "Constituez l'entreprise en enregistrant l'apport en capital initial des associés pour un montant de 50 000 € déposé sur le compte en banque.",
                accountsAllowed: ["512", "101"],
                expectedEntries: { "512": { debit: 50000 }, "101": { credit: 50000 } }
            },
            explanation: { success: "Félicitations, premier pas validé ! Les fonds proviennent du Capital Social (Crédit du passif 101) et s'incarnent en Banque (Débit de l'actif 512). Le bilan initial est à l'équilibre." }
        },
        2: {
            title: "Étape 2 : L'Activité Économique - Charges et Produits",
            theory: "Alors que le Bilan fige le patrimoine, le <strong>Compte de Résultat</strong> mesure l'activité de l'entreprise sur une période (l'exercice). Il oppose les <strong>Charges</strong> (classe 6, les dépenses nécessaires qui appauvrissent l'entreprise, comme le loyer ou l'électricité) aux <strong>Produits</strong> (classe 7, les ventes qui l'enrichissent). Les charges augmentent toujours au <strong>Débit</strong>, car elles représentent une consommation d'énergie économique. Attention à bien choisir le compte de charge selon sa nature réelle : un loyer est une <strong>charge externe</strong> (compte <strong>613 - Locations</strong>), jamais un achat de matières premières (601).",
            exercise: {
                instruction: "L'entreprise paie immédiatement par virement bancaire son premier loyer commercial pour un montant de 3 000 €.",
                accountsAllowed: ["613", "512"],
                expectedEntries: { "613": { debit: 3000 }, "512": { credit: 3000 } }
            },
            explanation: { success: "Correct ! Le loyer est une charge externe (Débit du compte 613 - Locations, jamais le 601 réservé aux achats de matières) qui vient imputer négativement ton résultat net de 3 000 €. La Banque (Crédit 512) diminue à l'actif." }
        },
        3: {
            title: "Étape 3 : La Richesse Créée - Le Flux de Produits",
            theory: "Les <strong>Produits</strong> (classe 7) mesurent la performance commerciale (Chiffre d'Affaires). À l'inverse des charges, les produits augmentent au <strong>Crédit</strong>. Ils tirent le résultat net vers le haut, ce qui, lors de la clôture annuelle, viendra gonfler les capitaux propres au passif du bilan. Ici, le client règle comptant : le produit et l'encaissement ont lieu au même instant.",
            exercise: {
                instruction: "Enregistrez une vente de prestations de services d'un montant de 8 000 € HT encaissée immédiatement sur le compte bancaire de l'entreprise.",
                accountsAllowed: ["512", "701"],
                expectedEntries: { "512": { debit: 8000 }, "701": { credit: 8000 } }
            },
            explanation: { success: "Magnifique ! Le produit de vente augmente au Crédit (701) tandis que le flux de trésorerie entre au Débit de la Banque (512)." }
        },
        4: {
            title: "Étape 4 : Le Principe Absolu de la Partie Double",
            theory: "En comptabilité, aucune écriture ne voyage seule. Chaque transaction implique au moins deux comptes : le total des montants inscrits au <strong>Débit</strong> doit être rigoureusement ÉGAL au total des montants inscrits au <strong>Crédit</strong>. C'est ce mécanisme de balance permanente qui garantit que le système ne perd jamais d'informations, quel que soit le nombre de comptes mouvementés dans une même écriture.",
            exercise: {
                instruction: "Pour renforcer ses liquidités, l'entreprise souscrit un emprunt de 20 000 € auprès de son partenaire financier. Enregistrez la réception des fonds.",
                accountsAllowed: ["512", "164"],
                expectedEntries: { "512": { debit: 20000 }, "164": { credit: 20000 } }
            },
            explanation: { success: "Écriture validée. La dette financière à long terme augmente au crédit du passif (164) et la trésorerie se renforce au débit de l'actif (512)." }
        },
        5: {
            title: "Étape 5 : Les Délais de Paiement - La Dette Fournisseur",
            theory: "Dans le monde des affaires, on paie rarement tout au comptant. Lorsqu'on achète des matières ou des services avec un délai de paiement (par exemple à 30 jours), on ne touche pas à la banque immédiatement. On constate la charge (classe 6) et on fait naître une dette transitoire envers le tiers au passif : le compte <strong>401 - Fournisseurs</strong>.",
            exercise: {
                instruction: "Vous recevez une facture d'achat de matières premières de 4 000 € HT. Le paiement est prévu le mois prochain. Enregistrez cette opération à crédit.",
                accountsAllowed: ["601", "401"],
                expectedEntries: { "601": { debit: 4000 }, "401": { credit: 4000 } }
            },
            explanation: { success: "C'est exactement ça. La charge augmente au Débit (601) et la dette fournisseur grandit au Crédit (401). Ton bilan reste équilibré." }
        },
        6: {
            title: "Étape 6 : L'Extinction des Dettes par le Règlement",
            theory: "Quand l'échéance arrive, il faut honorer ses engagements. Pour solder (éteindre) une dette qui était née au Crédit (401), il faut la débiter du même montant. En contrepartie, on constate la sortie d'argent effective au Crédit du compte Banque (512).",
            exercise: {
                instruction: "Payez par virement bancaire la facture du fournisseur de l'étape précédente pour un montant de 4 000 €.",
                accountsAllowed: ["401", "512"],
                expectedEntries: { "401": { debit: 4000 }, "512": { credit: 4000 } }
            },
            explanation: { success: "Parfait. Le compte 401 revient à zéro (Dette effacée au Débit) et l'argent quitte l'actif de la banque (Crédit 512)." }
        },
        7: {
            title: "Étape 7 : Les Délais de Vente - La Créance Client",
            theory: "Le mécanisme est symétrique pour vos ventes. Si vous accordez un délai de règlement à vos clients, l'argent n'entre pas directement en banque. Vous validez le produit (Crédit 701) et vous matérialisez un droit d'exiger cet argent plus tard à l'actif : le compte <strong>411 - Clients</strong> (Créance).",
            exercise: {
                instruction: "Facturez une prestation de services de 6 000 € HT à un grand compte. Un délai de paiement à 30 jours lui est accordé.",
                accountsAllowed: ["411", "701"],
                expectedEntries: { "411": { debit: 6000 }, "701": { credit: 6000 } }
            },
            explanation: { success: "Très bien ! La créance (Actif 411) augmente au Débit et le Chiffre d'Affaires grandit au Crédit (701)." }
        },
        8: {
            title: "Étape 8 : L'Encaissement des Créances Clients",
            theory: "Lorsque le client s'acquitte de sa facture, la créance s'éteint. Pour faire disparaître ce droit qui était enregistré au Débit (411), on le bascule au Crédit du même compte. En contrepartie, l'argent se matérialise enfin au Débit de notre Banque (512).",
            exercise: {
                instruction: "Enregistrez la réception du virement bancaire du client pour un montant de 6 000 €, soldant ainsi sa dette envers vous.",
                accountsAllowed: ["512", "411"],
                expectedEntries: { "512": { debit: 6000 }, "411": { credit: 6000 } }
            },
            explanation: { success: "Excellent ! La créance est soldée (Crédit 411) et l'argent est désormais sécurisé sur ton compte bancaire (Débit 512)." }
        },
        9: {
            title: "Étape 9 : Une Charge Universelle - Les Salaires du Personnel",
            theory: "Parmi toutes les charges d'exploitation, celle du personnel est presque toujours la plus importante pour une entreprise. Le salaire net versé à un employé s'enregistre au Débit du compte <strong>641 - Salaires du Personnel</strong>, en contrepartie d'une sortie de banque. (Le détail du bulletin de paie — brut, retenues, cotisations URSSAF — est une technicité approfondie réservée à un module dédié ; ici, on retient l'essentiel : un salaire est une charge, au même titre qu'un loyer.)",
            exercise: {
                instruction: "Vous versez par virement bancaire le salaire net de votre unique employé pour un montant de 2 200 €.",
                accountsAllowed: ["641", "512"],
                expectedEntries: { "641": { debit: 2200 }, "512": { credit: 2200 } }
            },
            explanation: { success: "Bien vu ! Le salaire est une charge comme une autre (Débit 641), qui réduit à la fois ton résultat net et ta trésorerie (Crédit 512)." }
        },
        10: {
            title: "Étape 10 : La Notion d'Investissement Durable (Immobilisation)",
            theory: "Attention à ne pas confondre une Charge et une <strong>Immobilisation</strong>. Si un achat est consommé rapidement (café, papier), c'est une charge (classe 6). Si cet achat est un bien durable destiné à rester plus d'un an dans l'entreprise pour générer de la valeur (ordinateur, mobilier, véhicule), c'est un investissement qui s'enregistre à l'Actif en classe 2. Un ordinateur de bureau est une immobilisation corporelle courante, mais ce n'est ni une machine industrielle ni un four : elle rejoint le compte <strong>218 - Autres Immobilisations Corporelles</strong>, distinct du 215 réservé au matériel de production.",
            exercise: {
                instruction: "Achetez au comptant par virement bancaire du matériel informatique de bureau pour un montant de 2 500 € HT.",
                accountsAllowed: ["218", "512"],
                expectedEntries: { "218": { debit: 2500 }, "512": { credit: 2500 } }
            },
            explanation: { success: "Écriture d'école validée. Le patrimoine s'enrichit d'une immobilisation au Débit du compte 218 (et non 215, réservé au matériel industriel), financée par un décaissement au Crédit de la banque 512." }
        },
        11: {
            title: "Étape 11 : L'Usure du Temps - La Notion d'Amortissement",
            theory: "Un ordinateur acheté aujourd'hui ne vaudra plus rien dans quelques années : il s'use, devient obsolète. La comptabilité traduit cette perte de valeur progressive et prévisible via l'<strong>amortissement</strong>. Chaque année, on constate une charge calculée (jamais un décaissement réel !) au Débit du compte <strong>6811 - Dotations aux Amortissements</strong>, en contrepartie d'un compte spécial qui vient réduire la valeur de l'actif au Bilan sans jamais l'effacer : <strong>2818 - Amortissements des Autres Immobilisations Corporelles</strong>.",
            exercise: {
                instruction: "Amortissez linéairement le matériel informatique de l'étape précédente (2 500 €) sur sa durée de vie estimée de 5 ans, soit une dotation annuelle de 500 €.",
                accountsAllowed: ["6811", "2818"],
                expectedEntries: { "6811": { debit: 500 }, "2818": { credit: 500 } }
            },
            explanation: { success: "Parfait ! Cette charge (500 €) ne sort pas un centime de ta banque — c'est une écriture purement comptable — mais elle reflète fidèlement la perte de valeur réelle de ton matériel dans le temps. Sa valeur nette au Bilan n'est plus que de 2 000 €." }
        },
        12: {
            title: "Étape 12 : Introduction à la TVA - Le Cas de l'Achat",
            theory: "La Taxe sur la Valeur Ajoutée (TVA) est partout dans la vie économique réelle, mais c'est un piège classique du débutant de croire qu'elle appauvrit ou enrichit l'entreprise. En réalité, l'entreprise n'est qu'un <strong>collecteur</strong> pour l'État : à l'achat, la TVA payée au fournisseur (au taux standard de 20%) est une créance récupérable, jamais une charge. Elle se loge à l'actif au compte <strong>44566 - TVA Déductible</strong>, distinct du prix d'achat lui-même.",
            exercise: {
                instruction: "Achetez au comptant des fournitures pour 1 000 € HT (+ 200 € de TVA déductible à 20%, soit 1 200 € TTC), réglées immédiatement par banque.",
                accountsAllowed: ["601", "44566", "512"],
                expectedEntries: { "601": { debit: 1000 }, "44566": { debit: 200 }, "512": { credit: 1200 } }
            },
            explanation: { success: "Exact ! Seuls les 1 000 € HT constituent une vraie charge (601). Les 200 € de TVA (44566) sont une créance récupérable sur l'État — pas un centime de charge supplémentaire pour l'entreprise." }
        },
        13: {
            title: "Étape 13 : Introduction à la TVA - Le Cas de la Vente",
            theory: "Symétriquement, lorsque vous facturez un client, vous encaissez de la TVA en son nom pour le compte de l'État — ce n'est pas non plus votre argent, ni un produit qui vous enrichit. Cette TVA collectée constitue une dette envers l'État, logée au passif au compte <strong>44571 - TVA Collectée</strong>, bien distincte de votre Chiffre d'Affaires réel (701).",
            exercise: {
                instruction: "Facturez une prestation de services de 5 000 € HT (+ 1 000 € de TVA collectée à 20%, soit 6 000 € TTC), encaissée immédiatement par banque.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 6000 }, "701": { credit: 5000 }, "44571": { credit: 1000 } }
            },
            explanation: { success: "Excellent ! Ton vrai Chiffre d'Affaires est de 5 000 € (701), pas 6 000 €. Les 1 000 € de TVA (44571) ne sont qu'une dette temporaire envers l'État, en attendant la déclaration périodique — un mécanisme que tu approfondiras au module suivant." }
        },
    },




    
  // ==========================================
    // MODULE 2 : LICENCE 2 - COMPTABILITÉ GÉNÉRALE INTERMÉDIAIRE (CURSUS COMPLET)
    // ==========================================
    mod2: {
        1: {
            title: "L2 - Étape 1 : Le Mécanisme de la TVA Collectée sur Ventes",
            theory: "La Taxe sur la Valeur Ajoutée (TVA) est un impôt indirect sur la consommation. Pour l'entreprise, elle est totalement neutre. Lors d'une vente, l'entité facture le montant Toutes Taxes Comprises (TTC) au client. Elle enregistre sa richesse réelle Hors Taxes (HT) en compte de produit (701) et isole la TVA facturée sur le compte <strong>44571 - TVA Collectée</strong>. Ce compte représente une dette stricte de l'entreprise envers l'État.",
            exercise: {
                instruction: "Facturez une vente de produits finis pour un montant de 10 000 € HT, soumise au taux standard de TVA à 20% (soit 2 000 € de TVA). Le client règle l'intégralité du montant TTC immédiatement en banque.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 12000 }, "701": { credit: 10000 }, "44571": { credit: 2000 } }
            },
            explanation: { success: "C'est parfait ! La banque encaisse le flux TTC (12 000 €), le Chiffre d'Affaires net progresse de 10 000 € au Crédit du 701, et la dette fiscale est actée pour 2 000 € au Crédit du 44571." }
        },
        2: {
            title: "L2 - Étape 2 : Le Droit à Récupération - La TVA Déductible sur Achats",
            theory: "À l'inverse des ventes, lorsqu'une entreprise réalise une dépense nécessaire à son exploitation, elle paie le montant TTC à son fournisseur mais dispose du droit de récupérer cette taxe auprès de l'État. On enregistre le coût net de la charge en classe 6 (HT) et on matérialise cette créance sur le Trésor Public au Débit du compte <strong>44566 - TVA Déductible sur biens et services</strong>.",
            exercise: {
                instruction: "Enregistrez l'achat de matières premières pour un montant de 5 000 € HT, avec une TVA déductible de 1 000 € (20%), payé immédiatement par virement bancaire.",
                accountsAllowed: ["601", "44566", "512"],
                expectedEntries: { "601": { debit: 5000 }, "44566": { debit: 1000 }, "512": { credit: 6000 } }
            },
            explanation: { success: "Parfait. La charge réelle de l'entreprise est de 5 000 € (Débit 601), l'État nous doit 1 000 € (Débit 44566) et la banque subit le décaissement global TTC de 6 000 € (Crédit 512)." }
        },
        3: {
            title: "L2 - Étape 3 : Facture d'Achat avec Réductions Commerciales (Rabais, Remise, Ristourne)",
            theory: "En comptabilité, les trois R (Rabais, Remise, Ristourne) accordés directement sur la facture d'achat d'origine ne se comptabilisent pas sur un compte séparé. On enregistre la charge directement pour son montant **Net Commercial** (c'est-à-dire le montant HT après déduction de la remise). La TVA s'applique ensuite sur ce net commercial.",
            exercise: {
                instruction: "Vous recevez une facture d'achat de matières premières. Prix brut : 10 000 € HT. Remise commerciale de 10% (Net commercial = 9 000 € HT). TVA à 20% = 1 800 €. Montant TTC payé par banque = 10 800 €. Enregistrez la ligne.",
                accountsAllowed: ["601", "44566", "512"],
                expectedEntries: { "601": { debit: 9000 }, "44566": { debit: 1800 }, "512": { credit: 10800 } }
            },
            explanation: { success: "Exact ! La règle du PCG est respectée : on ne comptabilise jamais les réductions commerciales portées sur la facture initiale, on prend directement le net commercial au débit du compte 601." }
        },
        4: {
            title: "L2 - Étape 4 : Les Réductions Financières - L'Escompte de Règlement",
            theory: "Contrairement aux remises commerciales, l'**Escompte** est une réduction financière accordée en cas de paiement rapide ou anticipé. L'escompte obtenu d'un fournisseur constitue un produit financier pour l'entreprise — jamais du chiffre d'affaires. On enregistre donc la charge brute HT au 601, on constate le produit financier au Crédit du compte dédié <strong>765 - Escomptes Obtenus</strong> (jamais le 701, réservé aux ventes), et on ajuste la TVA sur la base nette financière.",
            exercise: {
                instruction: "Achat de matières premières pour 2 000 € HT. Escompte de règlement obtenu de 100 € pour paiement comptant. TVA nette recalculée = 380 €. Net TTC payé en banque = 2 280 €. Enregistrez cette opération complexe (601 au débit pour 2000, 44566 au débit pour 380, banque au crédit pour 2280 et 765 au crédit pour 100).",
                accountsAllowed: ["601", "44566", "512", "765"],
                expectedEntries: { "601": { debit: 2000 }, "44566": { debit: 380 }, "512": { credit: 2280 }, "765": { credit: 100 } }
            },
            explanation: { success: "Splendide ! C'est une écriture technique de haut niveau. L'escompte est bien isolé en produit financier (765) au crédit, distinct de tes ventes." }
        },
        5: {
            title: "L2 - Étape 5 : L'Acquisition d'Actifs Immobilisés avec TVA",
            theory: "Lorsqu'on achète une immobilisation (classe 2), la TVA payée est également récupérable. Cependant, l'administration fiscale demande de l'isoler de la TVA sur charges courantes. Bien que le mécanisme reste le même, on utilise techniquement le même compte 44566 (ou 44562 en cabinet) au débit pour centraliser la créance de TVA sur investissement.",
            exercise: {
                instruction: "Achetez par virement bancaire une machine industrielle d'une valeur de 20 000 € HT soumis à une TVA de 20% (soit 4 000 € de TVA). Enregistrez l'entrée à l'actif.",
                accountsAllowed: ["215", "44566", "512"],
                expectedEntries: { "215": { debit: 20000 }, "44566": { debit: 4000 }, "512": { credit: 24000 } }
            },
            explanation: { success: "Félicitations. L'outil industriel lourd entre au débit de la classe 2 pour sa valeur HT nette, la créance d'État prend 4 000 € et le compte bancaire est crédité du TTC." }
        },
        6: {
            title: "L2 - Étape 6 : Travaux d'Inventaire - L'Amortissement Linéaire",
            theory: "Les immobilisations perdent de leur valeur économique avec le temps, l'usure ou l'obsolescence. Pour refléter cette réalité sans tricher sur la valeur du patrimoine, on pratique un **Amortissement** en fin d'année. On constate une charge calculée au Débit du compte <strong>6811 - Dotation aux amortissements</strong> et on réduit indirectement l'actif au Crédit du compte <strong>2815 - Amortissement du matériel</strong>.",
            exercise: {
                instruction: "Constatez l'amortissement annuel de la machine de l'étape précédente (Valeur : 20 000 €, amortissable sur 5 ans en linéaire, soit une dotation annuelle de 4 000 €).",
                accountsAllowed: ["6811", "2815"],
                expectedEntries: { "6811": { debit: 4000 }, "2815": { credit: 4000 } }
            },
            explanation: { success: "Magnifique ! La charge d'exploitation (6811) impacte le résultat pour acter la dépréciation, et le compte 2815 vient corriger la valeur nette de ton actif au bilan." }
        },
        7: {
            title: "L2 - Étape 7 : Gestion d'Inventaire - La Variation des Stocks",
            theory: "Pour respecter le principe fondamental de découpage des exercices, une entreprise ne peut pas laisser dans ses charges de l'année des matières premières achetées mais non consommées (qui dorment dans l'entrepôt). En fin d'exercice, on réalise un inventaire physique et on passe une écriture pour enregistrer le Stock Final à l'Actif (compte 311) en contrepartie du compte <strong>6031 - Variation des stocks</strong> au Crédit.",
            exercise: {
                instruction: "L'inventaire de fin d'année comptabilise la présence de 6 000 € de matières premières inutilisées en réserve. Enregistrez ce stock de clôture.",
                accountsAllowed: ["311", "6031"],
                expectedEntries: { "311": { debit: 6000 }, "6031": { credit: 6000 } }
            },
            explanation: { success: "Correct ! Le stock final s'inscrit à l'actif (Débit 311) et le compte 6031 vient s'inscrire au crédit du compte de résultat, ce qui réduit artificiellement tes charges globales pour coller à la consommation réelle." }
        },
        8: {
            title: "L2 - Étape 8 : Fin de mois - La Liquidation de la TVA (Solde Créditeur)",
            theory: "Chaque mois ou trimestre, le comptable procède à la **Liquidation de la TVA**. C'est le moment de faire les comptes avec l'État. On solde (remet à zéro) le compte de TVA Collectée en le débitant et le compte de TVA Déductible en le créditant. Si la TVA collectée est plus grande que la déductible, l'excédent forme une dette fiscale immédiate au crédit du compte <strong>44551 - TVA à décaisser</strong>.",
            exercise: {
                instruction: "Liquidez la TVA de la période : Soldez 2 000 € de TVA Collectée (Débit 44571) et 1 000 € de TVA Déductible (Crédit 44566) puis constatez le solde dû à l'État (44551).",
                accountsAllowed: ["44571", "44566", "44551"],
                expectedEntries: { "44571": { debit: 2000 }, "44566": { credit: 1000 }, "44551": { credit: 1000 } }
            },
            explanation: { success: "Écriture d'école validée ! Les comptes transitoires (44571 et 44566) sont vidés et remis à blanc, et la dette nette due à l'État est parfaitement isolée dans le compte 44551." }
        },
        9: {
            title: "L2 - Étape 9 : Le Règlement de la Dette Fiscale à l'État",
            theory: "Une fois la liquidation effectuée et la déclaration télétransmise, l'entreprise doit payer sa dette à l'administration fiscale. Pour éteindre la dette du compte 44551 née au Crédit, on va donc la débiter, et constater la sortie des fonds du compte bancaire (Crédit 512).",
            exercise: {
                instruction: "Enregistrez le télérèglement par prélèvement bancaire de la TVA due à l'État pour un montant de 1 000 €.",
                accountsAllowed: ["44551", "512"],
                expectedEntries: { "44551": { debit: 1000 }, "512": { credit: 1000 } }
            },
            explanation: { success: "Dette fiscale éteinte ! Le compte 44551 revient à zéro et le flux financier est sorti proprement de ta trésorerie." }
        },
        10: {
            title: "L2 - Étape 10 : Charge à Payer - La Facture Non Parvenue",
            theory: "Le principe de rattachement des charges impose d'enregistrer une dépense dans l'exercice où elle a été engagée, même si la facture papier n'est pas encore arrivée. À la clôture, si une livraison a été reçue sans facture correspondante, on estime son montant et on la comptabilise quand même : Débit de la charge HT (601), Débit de la TVA non encore déductible sur factures non parvenues (<strong>44586</strong>), et Crédit du compte de dette spécifique <strong>4088 - Fournisseurs, Factures Non Parvenues</strong> (jamais le 401 classique, réservé aux factures déjà reçues).",
            exercise: {
                instruction: "À la clôture, vous avez reçu une livraison de matières premières pour 2 000 € HT (TVA de 400 € à 20%) mais la facture du fournisseur n'est pas encore arrivée. Constatez cette charge à payer.",
                accountsAllowed: ["601", "44586", "4088"],
                expectedEntries: { "601": { debit: 2000 }, "44586": { debit: 400 }, "4088": { credit: 2400 } }
            },
            explanation: { success: "Parfait ! La charge est rattachée au bon exercice (Débit 601) même sans facture physique, et la dette provisoire est isolée sur le compte 4088 dédié aux Factures Non Parvenues." }
        },
        11: {
            title: "L2 - Étape 11 : Produit à Recevoir - La Vente Non Encore Facturée",
            theory: "Symétriquement, si vous avez livré une prestation à un client avant la clôture mais que la facture ne sera émise qu'après, le produit doit être rattaché à l'exercice en cours. On débite une créance provisoire <strong>4181 - Clients, Produits Non Encore Facturés</strong> (jamais le 411 classique, qui suppose une facture déjà émise) et on crédite le produit (701) ainsi que la TVA sur factures à établir (<strong>44587</strong>).",
            exercise: {
                instruction: "Vous avez livré une prestation à un client fin décembre pour 3 000 € HT (TVA de 600 € à 20%) mais la facture ne sera émise qu'en janvier. Constatez ce produit à recevoir.",
                accountsAllowed: ["4181", "701", "44587"],
                expectedEntries: { "4181": { debit: 3600 }, "701": { credit: 3000 }, "44587": { credit: 600 } }
            },
            explanation: { success: "Excellent ! Le Chiffre d'Affaires de l'exercice reflète fidèlement l'activité réelle de l'année (Crédit 701), même si la facture définitive n'existe pas encore." }
        },
    },





    

   // ==========================================
    // MODULE 3 : LICENCE 3 / MASTER 1 - COMPTABILITÉ APPROFONDIE (CURSUS COMPLET)
    // ==========================================
    mod3: {
        1: {
            title: "L3/M1 - Étape 1 : Le Reclassement des Clients Douteux",
            theory: "En vertu du principe de prudence, si un client rencontre de graves difficultés financières (redressement judiciaire, retards répétés), sa créance devient incertaine. On ne peut plus la laisser parmi les créances saines. La première étape consiste à **reclasser** le montant TTC de cette créance du compte client standard (411) vers le compte spécial <strong>416 - Clients Douteux</strong>.",
            exercise: {
                instruction: "Un client majeur qui vous doit 6 000 € TTC entre en procédure collective. Reclassez immédiatement l'intégralité de sa créance en compte de client douteux.",
                accountsAllowed: ["416", "411"],
                expectedEntries: { "416": { debit: 6000 }, "411": { credit: 6000 } }
            },
            explanation: { success: "Parfait ! Le compte 411 est crédité et le compte 416 est débité. La créance est isolée, le risque est désormais tracé dans ta balance." }
        },
        2: {
            title: "L3/M1 - Étape 2 : Constat de la Dépréciation de Créance",
            theory: "Une fois le client reclassé en 416, on évalue la perte probable (toujours basée sur le montant **Hors Taxes** de la créance). Si l'on estime qu'on ne récupérera jamais une partie de la somme, on doit provisionner ce risque — sans jamais toucher au compte 416 lui-même : le PCG impose une présentation en <strong>valeur brute</strong>. On crée donc une charge calculée au Débit du compte <strong>656 - Dotations aux dépréciations</strong>, en contrepartie d'un compte de dépréciation distinct au Crédit : <strong>491 - Dépréciation des Comptes Clients</strong>. Ce compte 491 viendra plus tard se déduire du 416 au Bilan (présentation nette), sans jamais annuler la créance brute elle-même.",
            exercise: {
                instruction: "Sur la créance douteuse de 6 000 € TTC (soit 5 000 € HT), l'avocat estime la perte probable à 60% du montant HT, soit 3 000 €. Passez l'écriture de dotation aux dépréciations.",
                accountsAllowed: ["656", "491"],
                expectedEntries: { "656": { debit: 3000 }, "491": { credit: 3000 } }
            },
            explanation: { success: "Excellent ! La charge prudente est enregistrée au débit du 656, réduisant le résultat net de l'année, et le compte 491 (dépréciation) est distinct du 416 (créance brute) — exactement la présentation exigée par le PCG." }
        },
        3: {
            title: "L3/M1 - Étape 3 : Facturation en Devises Étrangères",
            theory: "Lorsqu'une entreprise réalise une vente internationale dans une autre monnaie (ex: le Dollar), l'écriture doit obligatoirement être convertie et enregistrée en Euros dans la comptabilité française, au cours du change officiel du jour de la facture.",
            exercise: {
                instruction: "Vous vendez des licences logicielles aux USA pour une valeur convertie de 10 000 € au cours du jour. La facture est émise à crédit. Enregistrez cette vente internationale.",
                accountsAllowed: ["411", "701"],
                expectedEntries: { "411": { debit: 10000 }, "701": { credit: 10000 } }
            },
            explanation: { success: "Correct. Le compte client 411 prend 10 000 € au débit et le chiffre d'affaires augmente au crédit du 701." }
        },
        4: {
            title: "L3/M1 - Étape 4 : Règlement en Devises & Perte de Change Réalisée",
            theory: "Au moment où le client étranger paie sa dette, le cours de la monnaie a évolué. Si le Dollar a baissé par rapport à l'Euro, la banque va vous créditer un montant en Euros inférieur à la créance d'origine. Cette différence négative est une perte financière réelle et définitive à enregistrer au Débit du compte <strong>666 - Pertes de Change</strong>.",
            exercise: {
                instruction: "Le client américain solde sa facture. En raison du taux de change actuel, la banque ne crédite que 9 500 € sur votre compte. Soldez la créance d'origine de 10 000 € et constatez l'impact.",
                accountsAllowed: ["512", "666", "411"],
                expectedEntries: { "512": { debit: 9500 }, "666": { debit: 500 }, "411": { credit: 10000 } }
            },
            explanation: { success: "Écriture de haut niveau validée ! La créance historique est soldée (Crédit 411 pour 10 000 €), le cash réel entre en banque (9 500 €) et la perte de change est isolée au débit du 666." }
        },
        5: {
            title: "L3/M1 - Étape 5 : Prise de Participation dans une Filiale",
            theory: "Une entreprise qui prend une position stratégique durable dans une autre société (pour la contrôler ou l'influencer) enregistre cet investissement à l'actif immobilisé, au compte <strong>261 - Titres de Participation</strong>, et non en trésorerie courante. Attention : la <strong>consolidation</strong> à proprement parler (fusionner les comptes de la mère et de la filiale en un unique bilan de groupe) est un retraitement qui se fait sur un tableur de consolidation externe, jamais directement dans la comptabilité d'une seule entité — ce n'est donc pas une écriture de journal classique, et ce module se concentre sur ce que l'entreprise mère enregistre réellement dans ses propres livres.",
            exercise: {
                instruction: "Vous acquérez 30% du capital d'une société partenaire stratégique pour un montant de 30 000 €, réglé immédiatement par virement bancaire. Enregistrez ce titre de participation à l'actif.",
                accountsAllowed: ["261", "512"],
                expectedEntries: { "261": { debit: 30000 }, "512": { credit: 30000 } }
            },
            explanation: { success: "Étape validée. Le titre de participation entre à l'actif immobilisé (261), en échange d'une sortie de trésorerie réelle et vérifiable." }
        },
        6: {
            title: "L3/M1 - Étape 6 : Dividendes Reçus de la Participation",
            theory: "Lorsque la filiale dans laquelle vous détenez des titres réalise des bénéfices et décide de les distribuer, vous percevez votre quote-part sous forme de dividendes. Ce n'est ni une vente, ni un remboursement de votre investissement d'origine : c'est un <strong>produit financier</strong>, enregistré au compte <strong>762 - Revenus des Titres de Participation</strong>.",
            exercise: {
                instruction: "La filiale dans laquelle vous détenez des titres vous verse un dividende de 3 000 € par virement bancaire. Enregistrez ce produit financier.",
                accountsAllowed: ["512", "762"],
                expectedEntries: { "512": { debit: 3000 }, "762": { credit: 3000 } }
            },
            explanation: { success: "Exact ! Le dividende enrichit ta trésorerie (Débit 512) et améliore ton résultat via un produit financier (Crédit 762), sans jamais toucher à ton compte de Capital." }
        },
        7: {
            title: "L3/M1 - Étape 7 : Dépréciation des Titres de Participation",
            theory: "Le même principe de prudence appliqué plus tôt aux créances clients douteuses s'applique aussi aux titres financiers : si la valeur réelle de votre participation chute durablement en dessous de son prix d'acquisition, vous devez constater une dépréciation. On débite une charge financière calculée <strong>686 - Dotations aux Dépréciations Financières</strong> et on crédite un compte de dépréciation dédié, <strong>296 - Dépréciation des Titres de Participation</strong>, qui viendra réduire la valeur brute du 261 au Bilan sans jamais l'annuler directement.",
            exercise: {
                instruction: "La filiale traverse une passe difficile : la valeur réelle de votre participation (achetée 30 000 €) est désormais estimée à seulement 24 000 €. Par prudence, constituez une dépréciation de 6 000 € sur vos titres.",
                accountsAllowed: ["686", "296"],
                expectedEntries: { "686": { debit: 6000 }, "296": { credit: 6000 } }
            },
            explanation: { success: "Parfait réflexe de prudence ! Ta participation brute (261) reste affichée à son coût historique de 30 000 €, mais le Bilan présente désormais une valeur nette de 24 000 € grâce à la dépréciation (296)." }
        },
        8: {
            title: "L3/M1 - Étape 8 : L'Activation des Frais de R&D",
            theory: "En comptabilité approfondie, les dépenses de Recherche & Développement (salaires des ingénieurs, prototypes) peuvent être retirées des charges et transférées à l'actif sous forme d'**Immobilisation Incorporelle** (compte 203), à condition que le projet ait de fortes chances de réussite commerciale. On débite le compte 203 et on crédite le compte de produit technique <strong>721 - Production Immobilisée</strong>.",
            exercise: {
                instruction: "Le projet de nouveau logiciel étant viable, transférez 25 000 € de frais de développement à l'actif. Enregistrez cette activation de R&D.",
                accountsAllowed: ["203", "721"],
                expectedEntries: { "203": { debit: 25000 }, "721": { credit: 25000 } }
            },
            explanation: { success: "Magnifique ! Les dépenses sortent indirectement des charges de l'année via le produit 721 (qui annule l'impact sur le résultat), et le logiciel apparaît à l'actif (203) comme un investissement." }
        },
        9: {
            title: "L3/M1 - Étape 9 : L'Amortissement des Frais de R&D Activés",
            theory: "Une fois activés à l'actif, les frais de Recherche & Développement (203) doivent être amortis sur leur durée de vie estimée (généralement 5 ans au maximum). Le mécanisme reste le même : débit du compte de dotation 6811 et crédit d'un compte d'amortissement dédié. On utilise <strong>2803 - Amortissements des Frais de R&D</strong>, distinct du 2815 (qui suit exclusivement le matériel industriel), afin que chaque immobilisation conserve son propre suivi de valeur nette.",
            exercise: {
                instruction: "Passez l'écriture d'amortissement annuel de vos frais de R&D activés (Valeur : 25 000 €, amortissable sur 5 ans, soit une dotation de 5 000 €).",
                accountsAllowed: ["6811", "2803"],
                expectedEntries: { "6811": { debit: 5000 }, "2803": { credit: 5000 } }
            },
            explanation: { success: "Parfait ! La dépréciation annuelle de ton actif immatériel est actée en charge, et isolée sur son propre compte d'amortissement 2803." }
        },
        10: {
            title: "L3/M1 - Étape 10 : Provision pour Risque Prud'homal",
            theory: "Le principe de prudence ne s'applique pas qu'aux créances clients. Si l'entreprise fait face à un risque juridique probable mais dont le montant définitif reste incertain (litige, procès en cours), elle doit constituer une <strong>Provision pour Risques et Charges</strong>. Contrairement à une dette certaine, ce risque est estimé. On débite une charge calculée <strong>6815 - Dotations aux Provisions</strong> et on crédite le compte de passif <strong>151 - Provisions pour Risques et Charges</strong>.",
            exercise: {
                instruction: "Un ancien salarié conteste son licenciement aux Prud'hommes. Vos avocats estiment un risque de condamnation de 4 000 €. Constituez la provision correspondante.",
                accountsAllowed: ["6815", "151"],
                expectedEntries: { "6815": { debit: 4000 }, "151": { credit: 4000 } }
            },
            explanation: { success: "Provision constituée ! Le résultat de l'exercice absorbe déjà ce risque potentiel (Débit 6815), et le Passif du Bilan affiche honnêtement cette dette probable (Crédit 151), même si son montant définitif n'est pas encore certain." }
        },
        11: {
            title: "L3/M1 - Étape 11 : Reprise de la Dépréciation Devenue Sans Objet",
            theory: "Bonne nouvelle : le client douteux de l'étape 2 se redresse finalement et confirme qu'il va payer intégralement. Le risque ayant disparu, on doit annuler la dépréciation constituée à tort en sens inverse : on débite le compte de dépréciation <strong>491</strong> (qui revient à zéro) et on crédite un produit de reprise, <strong>7816 - Reprises sur Dépréciations</strong>, qui vient améliorer le résultat de l'exercice en cours.",
            exercise: {
                instruction: "Le client douteux confirme sa capacité à payer intégralement sa dette. Reprenez la totalité de la dépréciation constituée précédemment (3 000 €), devenue sans objet.",
                accountsAllowed: ["491", "7816"],
                expectedEntries: { "491": { debit: 3000 }, "7816": { credit: 3000 } }
            },
            explanation: { success: "Excellent réflexe ! La dépréciation est reprise en produit (7816), ce qui restaure ton résultat net de l'exactitude économique retrouvée. Le compte 491 est à zéro : il n'y a plus de risque sur ce client." }
        },
        12: {
            title: "L3/M1 - Étape 12 : Encaissement Final de la Créance Assainie",
            theory: "Le client, désormais fiable, règle sa dette d'origine. On solde la créance qui dormait au Débit du compte 416 (Clients Douteux) par le Crédit, en contrepartie de l'entrée réelle des fonds au Débit de la Banque.",
            exercise: {
                instruction: "Encaissez par virement bancaire le règlement intégral de la créance client douteuse, soit 6 000 € TTC.",
                accountsAllowed: ["512", "416"],
                expectedEntries: { "512": { debit: 6000 }, "416": { credit: 6000 } }
            },
            explanation: { success: "Dossier clos ! Le cycle complet de gestion d'un risque client — reclassement, dépréciation, reprise, encaissement — n'a plus aucun secret pour toi." }
        },
    },




    

   // ==========================================
    // MODULE 4 : MASTER 2 - FISCALITÉ DES ENTREPRISES (CURSUS COMPLET)
    // ==========================================
    mod4: {
        1: {
            title: "M2 - Étape 1 : Le Versement des Acomptes d'Impôt sur les Sociétés (IS)",
            theory: "En France, l'Impôt sur les Sociétés (IS) ne se paie pas en une seule fois en fin d'année. Les entreprises réalisant des bénéfices doivent verser **4 acomptes** trimestriels au cours de l'exercice. Ces acomptes constituent une avance faite à l'État et s'enregistrent au Débit du compte de tiers dédié <strong>4441 - État, Acomptes d'IS</strong> par le crédit de la Banque (512). On se garde bien d'utiliser le compte 411 (Clients), réservé exclusivement aux créances commerciales.",
            exercise: {
                instruction: "Enregistrez le paiement par prélèvement bancaire du premier acompte d'IS de l'année pour un montant de 2 000 €.",
                accountsAllowed: ["4441", "512"],
                expectedEntries: { "4441": { debit: 2000 }, "512": { credit: 2000 } }
            },
            explanation: { success: "Correct ! L'acompte est acté comme une créance d'avance sur l'État (Débit 4441) financée par une sortie de trésorerie (Crédit 512)." }
        },
        2: {
            title: "M2 - Étape 2 : Le Versement du Deuxième Acompte d'IS",
            theory: "Le cycle fiscal se poursuit au cours de l'été. L'entreprise doit honorer son deuxième acompte d'IS calculé sur la base des bénéfices historiques. Le mécanisme comptable reste rigoureusement identique.",
            exercise: {
                instruction: "Passez l'écriture de règlement par banque du deuxième acompte d'IS obligatoire pour un montant de 2 000 €.",
                accountsAllowed: ["4441", "512"],
                expectedEntries: { "4441": { debit: 2000 }, "512": { credit: 2000 } }
            },
            explanation: { success: "Validé. Vos avances d'impôt cumulées au débit du compte 4441 s'élèvent désormais à 4 000 €." }
        },
        3: {
            title: "M2 - Étape 3 : Travaux de Fin d'Exercice - Liquidation de la Charge d'IS",
            theory: "À la clôture de l'exercice comptable, le fiscaliste détermine le bénéfice fiscal réel et calcule l'impôt total définitif dû pour l'année. Cet impôt global constitue une charge obligatoire de l'exercice à enregistrer au Débit du compte <strong>695 - Impôts sur les bénéfices</strong> en contrepartie du compte de dette fiscale au Crédit du compte <strong>444 - État, Impôt sur les Bénéfices</strong>.",
            exercise: {
                instruction: "Le calcul final de l'impôt sur les sociétés pour l'année s'élève à un montant total de 7 000 €. Constatez cette charge fiscale annuelle.",
                accountsAllowed: ["695", "444"],
                expectedEntries: { "695": { debit: 7000 }, "444": { credit: 7000 } }
            },
            explanation: { success: "Exact ! La charge totale d'IS est enregistrée (Débit 695), ce qui diminue le résultat net de l'entreprise, et la dette brute envers le fisc est posée (Crédit 444)." }
        },
        4: {
            title: "M2 - Étape 4 : Régularisation du Solde d'IS (Imputation des Acomptes)",
            theory: "Pour payer ce que l'on doit réellement à l'État, on doit imputer (déduire) les acomptes déjà versés au cours de l'année (4 000 € stockés au débit du 4441). On solde le compte d'acomptes en le créditant, et on diminue la dette fiscale globale (compte 444) en la débitant du montant des acomptes.",
            exercise: {
                instruction: "Imputez les 4 000 € d'acomptes versés en cours d'année sur votre dette fiscale globale (Débitez 444 pour 4000 et Créditez 4441 pour 4000).",
                accountsAllowed: ["444", "4441"],
                expectedEntries: { "444": { debit: 4000 }, "4441": { credit: 4000 } }
            },
            explanation: { success: "Parfait ! Le compte d'acomptes 4441 est soldé et la dette fiscale nette restante au passif (compte 444) n'est plus que de 3 000 € (7 000 € - 4 000 €)." }
        },
        5: {
            title: "M2 - Étape 5 : Paiement du Solde d'IS au Trésor Public",
            theory: "Au mois de mai de l'année suivante, l'entreprise transmet sa liasse fiscale et procède au paiement du solde de l'impôt. On éteint la dette restante en débitant le compte 444 par le crédit du compte de Banque (512).",
            exercise: {
                instruction: "Réglez par virement bancaire le solde d'IS restant dû à l'administration fiscale pour un montant de 3 000 €.",
                accountsAllowed: ["444", "512"],
                expectedEntries: { "444": { debit: 3000 }, "512": { credit: 3000 } }
            },
            explanation: { success: "Dette d'IS totalement apurée ! Les flux fiscaux sur les bénéfices de cet exercice sont clos." }
        },
        6: {
            title: "M2 - Étape 6 : Optimisation Fiscale - Le Crédit d'Impôt Recherche (CIR)",
            theory: "Pour encourager l'innovation, l'État accorde aux entreprises un **Crédit d'Impôt Recherche (CIR)**. Ce dispositif fiscal vient directement réduire le montant de l'impôt à payer. Comptablement, le CIR représente une créance sur l'État qui vient diminuer la charge d'impôt globale : on crédite le compte 695 et on débite une créance sur l'État (compte 4441, utilisé ici comme compte d'imputation fiscale).",
            exercise: {
                instruction: "L'administration valide votre dossier d'innovation et vous octroie un Crédit d'Impôt Recherche (CIR) d'un montant de 1 500 €. Enregistrez ce produit fiscal au crédit du compte 695.",
                accountsAllowed: ["4441", "695"],
                expectedEntries: { "4441": { debit: 1500 }, "695": { credit: 1500 } }
            },
            explanation: { success: "Magnifique ! Le crédit du compte 695 réduit mathématiquement ta charge d'impôt nette de l'année, améliorant ton résultat, et la créance est enregistrée sur le compte 4441." }
        },
        7: {
            title: "M2 - Étape 7 : Régularisation annuelle de TVA - Le Crédit de TVA",
            theory: "Parfois, suite à de lourds investissements, une entreprise paie plus de TVA sur ses achats qu'elle n'en collecte sur ses ventes. Lors de la liquidation, le solde n'est pas une dette, mais un **Crédit de TVA** (une créance sur l'État). On solde la TVA collectée et déductible, et on enregistre ce droit au remboursement au Débit du compte de créance 44566 (ou 44567 par simplification, ici géré sur le 44566).",
            exercise: {
                instruction: "Procédez à la liquidation de TVA : le compte 44566 (TVA déductible) affiche un solde débiteur cumulé de 3 500 € et le compte 44571 (TVA collectée) un solde créditeur de 2 000 €. Soldez la TVA collectée (Débit 44571 pour 2 000 €) par le crédit de la TVA déductible à due concurrence (Crédit 44566 pour 2 000 €). Il restera alors un solde débiteur net de 1 500 € sur le compte 44566, qui matérialise le Crédit de TVA (créance sur l'État).",
                accountsAllowed: ["44571", "44566"],
                expectedEntries: { "44571": { debit: 2000 }, "44566": { credit: 2000 } }
            },
            explanation: { success: "Excellent ! Le compte de TVA déductible conserve un solde débiteur net de 1 500 €, matérialisant la créance de remboursement que l'État te doit." }
        },
        8: {
            title: "M2 - Étape 8 : Demande de Remboursement du Crédit de TVA",
            theory: "L'entreprise choisit de demander le remboursement effectif de ce crédit de TVA à l'État plutôt que de l'imputer sur le mois d'après. Lorsque l'État valide et effectue le virement sur notre compte, on encaisse l'argent en Banque (Débit 512) et on éteint la créance de TVA (Crédit 44566).",
            exercise: {
                instruction: "Enregistrez la réception sur votre compte bancaire du remboursement de TVA envoyé par le Trésor Public pour un montant de 1 500 €.",
                accountsAllowed: ["512", "44566"],
                expectedEntries: { "512": { debit: 1500 }, "44566": { credit: 1500 } }
            },
            explanation: { success: "Trésorerie encaissée ! La créance fiscale est soldée et convertie en liquidités sonnantes et trébuchantes." }
        },
        9: {
            title: "M2 - Étape 9 : Taxes Locales - Enregistrement de la CFE",
            theory: "Les entreprises sont soumises à des impôts locaux, notamment la **Cotisation Foncière des Entreprises (CFE)**. Contrairement à l'IS, la CFE ne dépend pas des bénéfices : c'est une charge d'exploitation courante, mais ce n'est en aucun cas un achat de matières premières. Elle s'enregistre au Débit du compte dédié <strong>6351 - Impôts, Taxes et Versements Assimilés</strong> et se paie par la banque.",
            exercise: {
                instruction: "Enregistrez l'avis d'imposition et le paiement immédiat par banque de la CFE annuelle d'un montant de 800 €.",
                accountsAllowed: ["6351", "512"],
                expectedEntries: { "6351": { debit: 800 }, "512": { credit: 800 } }
            },
            explanation: { success: "Validé. La charge fiscale locale est actée sur son propre compte d'impôts et taxes (6351), bien distinct des achats, et les fonds sont décaissés." }
        },
    },



    

   // ==========================================
    // MODULE 5 : MASTER 2 - GESTION SOCIALE & PAIE (CURSUS COMPLET)
    // ==========================================
    mod5: {
        1: {
            title: "M2 - Étape 1 : Centralisation du Salaire Brut",
            theory: "Le bulletin de paie se comptabilise en plusieurs flux. Le premier flux est le **Salaire Brut**, qui représente l'obligation contractuelle brute totale de l'employeur avant toute retenue. C'est une charge d'exploitation pure à inscrire au Débit du compte <strong>641 - Salaires du Personnel</strong>. En contrepartie, on valide l'engagement de payer l'équipe au Crédit du compte de tiers <strong>421 - Personnel, Rémunérations dues</strong>.",
            exercise: {
                instruction: "Passez l'écriture de centralisation de la paie du mois pour un montant total de salaires bruts de 5 000 €. Pour le moment, affectez la totalité en contrepartie du compte Personnel (421).",
                accountsAllowed: ["641", "421"],
                expectedEntries: { "641": { debit: 5000 }, "421": { credit: 5000 } }
            },
            explanation: { success: "Parfait ! Le coût brut est acté en charge (Débit 641) et la dette envers le personnel est posée au passif (Crédit 421)." }
        },
        2: {
            title: "M2 - Étape 2 : Retenue à la source des Charges Salariales",
            theory: "Le salarié ne touche pas le salaire brut. L'entreprise doit prélever (retenir à la source) les **charges salariales** (retraite, prévoyance...) pour les reverser plus tard aux organismes sociaux. Cette retenue vient **diminuer** ce que l'on doit au salarié (on Débite le 421) et crée une dette envers la sécurité sociale au Crédit du compte <strong>431 - Organismes Sociaux (URSSAF)</strong>.",
            exercise: {
                instruction: "Sur la paie précédente, prélevez 1 100 € de charges salariales sur le compte du personnel (421) pour les transférer sur le compte de l'URSSAF (431).",
                accountsAllowed: ["421", "431"],
                expectedEntries: { "421": { debit: 1100 }, "431": { credit: 1100 } }
            },
            explanation: { success: "Excellent ! La dette envers le salarié (421) baisse à 3 900 € (ce qui correspond à son salaire net avant impôt) et ta dette URSSAF (431) augmente au Crédit." }
        },
        3: {
            title: "M2 - Étape 3 : Intégration des Cotisations Patronales",
            theory: "En plus des charges prélevées sur le dos du salarié, l'employeur français doit payer de sa propre poche les **charges patronales** (URSSAF, allocations familiales, chômage). C'est un coût direct supplémentaire d'exploitation. On débite le compte de charges <strong>645 - Charges de Sécurité Sociale</strong> et on augmente la dette globale envers l'organisme collecteur au Crédit du compte <strong>431 - Organismes Sociaux</strong>.",
            exercise: {
                instruction: "Comptabilisez l'avis de cotisations patronales du mois calculé par le logiciel de paie pour un montant de 1 800 €.",
                accountsAllowed: ["645", "431"],
                expectedEntries: { "645": { debit: 1800 }, "431": { credit: 1800 } }
            },
            explanation: { success: "Parfait ! La charge sociale d'entreprise augmente (Débit 645) et ton passif social URSSAF grandit au Crédit (431)." }
        },
        4: {
            title: "M2 - Étape 4 : Comptabilisation des Primes d'Assurance Mutuelle",
            theory: "La mutuelle d'entreprise est obligatoire et cofinancée. La part prise en charge par l'employeur constitue un avantage social, donc une charge de personnel. Elle s'enregistre au Débit du compte de charges <strong>645 - Charges de Sécurité Sociale</strong> (ou 647 en cabinet) en contrepartie d'une dette envers l'organisme assureur (compte fournisseur 401).",
            exercise: {
                instruction: "Enregistrez la facture mensuelle de la mutuelle d'entreprise. La part patronale nette à votre charge s'élève à 300 €. Le paiement est prévu le mois prochain.",
                accountsAllowed: ["645", "401"],
                expectedEntries: { "645": { debit: 300 }, "401": { credit: 300 } }
            },
            explanation: { success: "Écriture validée. La charge est bien comptabilisée au débit et la facture est en attente au passif." }
        },
        5: {
            title: "M2 - Étape 5 : Provision pour Congés Payés (Ajustement d'Inventaire)",
            theory: "À la fin de l'année, les salariés ont acquis des jours de vacances qu'ils n'ont pas encore pris. Selon le principe de rattachement des charges, l'entreprise doit provisionner le coût futur de ces vacances. On enregistre cette charge estimée au Débit du compte 641 (sous-compte indemnités) et on crée une dette provisionnée au passif sur le compte 421.",
            exercise: {
                instruction: "En fin d'exercice, le calcul des Congés Payés à payer (CP) s'élève à 1 500 €. Enregistrez cette provision sociale.",
                accountsAllowed: ["641", "421"],
                expectedEntries: { "641": { debit: 1500 }, "421": { credit: 1500 } }
            },
            explanation: { success: "Correct ! La charge est bien provisionnée sur l'exercice en cours, respectant l'image fidèle des comptes." }
        },
        6: {
            title: "M2 - Étape 6 : Le Règlement des Salaires par Virement (Le Net)",
            theory: "Au début du mois suivant, l'entreprise exécute l'ordre de virement bancaire pour payer les employés. Pour éteindre la dette transitoire de rémunération nette qui dort au passif (compte 421), on va donc la débiter, et constater le décaissement au Crédit de la Banque (512).",
            exercise: {
                instruction: "Procédez au paiement par virement du salaire net de vos collaborateurs pour un montant global de 3 900 € (Débit 421 et Crédit 512).",
                accountsAllowed: ["421", "512"],
                expectedEntries: { "421": { debit: 3900 }, "512": { credit: 3900 } }
            },
            explanation: { success: "Trésorerie décaissée ! Vos salariés ont reçu leur virement. Le compte 421 est apuré de son flux courant." }
        },
        7: {
            title: "M2 - Étape 7 : Télérèglement des Charges Sociales via la DSN",
            theory: "Via la Déclaration Sociale Nominative (DSN), l'entreprise transmet ses données et solde ses dettes d'URSSAF au milieu du mois. Pour éteindre la dette sociale globale du compte 431 née au Crédit (charges salariales + patronales), on la Débite par le crédit du compte de Banque (512).",
            exercise: {
                instruction: "Réglez par prélèvement bancaire la totalité de votre dette URSSAF cumulée sur le compte 431 pour un montant total de 2 900 €.",
                accountsAllowed: ["431", "512"],
                expectedEntries: { "431": { debit: 2900 }, "512": { credit: 2900 } }
            },
            explanation: { success: "Dette URSSAF éteinte ! Le passif social est propre et le compte 431 revient à zéro." }
        },
        8: {
            title: "M2 - Étape 8 : Social Avancé - L'Indemnité de Rupture Conventionnelle",
            theory: "Lorsqu'un salarié quitte l'entreprise dans le cadre d'une rupture amiable (rupture conventionnelle), il perçoit une indemnité de départ. Pour l'entreprise, cette indemnité exceptionnelle constitue une charge de personnel spécifique à enregistrer au Débit du compte <strong>641 - Salaires du Personnel</strong> (et génère une dette transitoire sur le 421).",
            exercise: {
                instruction: "Un cadre supérieur quitte la structure. Comptabilisez son indemnité légale de rupture d'un montant de 5 000 € (affectez la charge sur le 641 et le passif sur le 421).",
                accountsAllowed: ["641", "421"],
                expectedEntries: { "641": { debit: 5000 }, "421": { credit: 5000 } }
            },
            explanation: { success: "Validé. La charge de licenciement/rupture est actée et impactera le résultat opérationnel." }
        },
        9: {
            title: "M2 - Étape 9 : Paiement du chèque de solde de tout compte",
            theory: "Le jour de son départ, le salarié reçoit son reçu pour solde de tout compte comprenant son indemnité et ses reliquats. L'écriture d'extinction de la dette sociale reste classique : débit du compte de tiers par le crédit financier.",
            exercise: {
                instruction: "Signez et enregistrez le paiement par banque du chèque de solde de tout compte du salarié pour un montant de 5 000 €.",
                accountsAllowed: ["421", "512"],
                expectedEntries: { "421": { debit: 5000 }, "512": { credit: 5000 } }
            },
            explanation: { success: "Le collaborateur est payé, la dette sociale de rupture est effacée." }
        },
    },



    

  // ==========================================
    // SIMULATEUR 1 : 🥖 L'ARTISAN BOULANGER (15 ÉTAPES)
    // ==========================================
    boulangerie: {
        1: {
            title: "Mois 1 : Financement & Apport",
            theory: "Bienvenue à la tête de votre boulangerie artisanale. Pour démarrer l'activité, il faut injecter des ressources stables au passif pour ouvrir votre compte bancaire à l'actif.",
            exercise: {
                instruction: "Enregistrez l'apport initial de 20 000 € de capital social (101) et le déblocage de l'emprunt bancaire de 30 000 € (164) reçus sur le compte bancaire (512).",
                accountsAllowed: ["512", "101", "164"],
                expectedEntries: { "512": { debit: 50000 }, "101": { credit: 20000 }, "164": { credit: 30000 } }
            },
            explanation: { success: "Trésorerie opérationnelle de 50 000 € disponible en banque pour lancer le projet !" }
        },
        2: {
            title: "Mois 2 : Acquisition du Matériel (Le Four)",
            theory: "Pour cuire votre pain, il vous faut un investissement durable. C'est une immobilisation corporelle qui entre à l'actif du bilan en classe 2 et non en charge.",
            exercise: {
                instruction: "Achetez un fournil et un pétrin professionnel d'une valeur de 15 000 € HT payés immédiatement par virement bancaire (sans TVA pour cette étape).",
                accountsAllowed: ["215", "512"],
                expectedEntries: { "215": { debit: 15000 }, "512": { credit: 15000 } }
            },
            explanation: { success: "Le matériel industriel lourd est correctement inscrit à l'actif de ton bilan." }
        },
        3: {
            title: "Trimestre 1 : Premier gros achat de farine",
            theory: "La farine est votre matière première principale. C'est une charge courante d'exploitation (classe 6). Votre meunier vous accorde un délai de paiement.",
            exercise: {
                instruction: "Enregistrez l'achat de sacs de farine pour un montant de 8 000 € HT, avec une TVA déductible de 440 € (taux réduit à 5.5%). La facture est à crédit (401).",
                accountsAllowed: ["601", "44566", "401"],
                expectedEntries: { "601": { debit: 8000 }, "44566": { debit: 440 }, "401": { credit: 8440 } }
            },
            explanation: { success: "Charge et dette fournisseur enregistrées. La farine va pouvoir être transformée !" }
        },
        4: {
            title: "Trimestre 1 : Règlement du meunier",
            theory: "L'échéance de la facture est arrivée. Vous devez éteindre votre dette fournisseur en faisant sortir l'argent de votre trésorerie.",
            exercise: {
                instruction: "Réglez par virement bancaire la totalité de la dette due au fournisseur de farine pour un montant de 8 440 €.",
                accountsAllowed: ["401", "512"],
                expectedEntries: { "401": { debit: 8440 }, "512": { credit: 8440 } }
            },
            explanation: { success: "Dette fournisseur apurée. Ton compte 401 revient proprement à zéro." }
        },
        5: {
            title: "Semestre 1 : Ventes cumulées de la boutique",
            theory: "Les clients de la boulangerie achètent leurs baguettes et viennoiseries tous les jours au comptant en monnaie ou CB. On centralise le Chiffre d'Affaires de la période.",
            exercise: {
                instruction: "Enregistrez les ventes de pains et pâtisseries de la période pour 35 000 € HT, avec une TVA collectée de 1 925 € (5.5%). Le montant TTC est encaissé en banque.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 36925 }, "701": { credit: 35000 }, "44571": { credit: 1925 } }
            },
            explanation: { success: "Belles performances commerciales ! Le chiffre d'affaires fait grimper ton résultat net." }
        },
        6: {
            title: "Mois 11 : Facture d'énergie (Électricité des fours)",
            theory: "La cuisson du pain consomme énormément d'électricité. C'est une charge externe d'exploitation courante, à distinguer d'un achat de matières premières : l'énergie et les fournitures non stockables se comptabilisent au compte <strong>606 - Achats Non Stockés (Fournitures, Énergie)</strong>, jamais au 601 réservé à la farine et aux ingrédients.",
            exercise: {
                instruction: "Enregistrez la facture d'électricité EDF pour un montant de 3 000 € HT (+ 600 € de TVA déductible à 20%), payée immédiatement par banque.",
                accountsAllowed: ["606", "44566", "512"],
                expectedEntries: { "606": { debit: 3000 }, "44566": { debit: 600 }, "512": { credit: 3600 } }
            },
            explanation: { success: "Charge d'énergie comptabilisée sur le bon compte (606, distinct des matières premières). Le résultat s'ajuste en temps réel." }
        },
        7: {
            title: "Mois 12 : Salaire de l'apprenti boulanger",
            theory: "Il est temps de rémunérer votre jeune apprenti. On constate la charge brute pour l'entreprise (641), on retient à la source ses cotisations salariales dues à l'URSSAF (431), et le solde net à payer reste une dette envers le salarié (compte 421 - Personnel, jamais le 411 réservé aux clients).",
            exercise: {
                instruction: "Comptabilisez le salaire brut de l'apprenti pour un montant de 2 000 € (Débit 641). En contrepartie, retenez 400 € de cotisations salariales (Crédit 431) et laissez apparaître le salaire net à payer de 1 600 € (Crédit 421).",
                accountsAllowed: ["641", "421", "431"],
                expectedEntries: { "641": { debit: 2000 }, "421": { credit: 1600 }, "431": { credit: 400 } }
            },
            explanation: { success: "Salaire brut, retenue salariale et net à payer parfaitement tracés et équilibrés (2 000 € = 1 600 € + 400 €). Passons aux charges patronales." }
        },
        8: {
            title: "Mois 12 : Cotisations URSSAF patronales",
            theory: "L'écriture de paie nécessite d'ajouter les cotisations de sécurité sociale à la charge de l'employeur.",
            exercise: {
                instruction: "Enregistrez la part patronale des charges sociales pour un montant de 400 € due à l'URSSAF (compte 431).",
                accountsAllowed: ["645", "431"],
                expectedEntries: { "645": { debit: 400 }, "431": { credit: 400 } }
            },
            explanation: { success: "Charges sociales d'exploitation validées !" }
        },
        9: {
            title: "Mois 12 : Virement bancaire de l'apprenti",
            theory: "Le mois se termine, vous versez son salaire net à l'apprenti pour éteindre votre dette de personnel.",
            exercise: {
                instruction: "Soldez le compte du personnel (421) en payant les 1 600 € de salaire net par virement bancaire.",
                accountsAllowed: ["421", "512"],
                expectedEntries: { "421": { debit: 1600 }, "512": { credit: 1600 } }
            },
            explanation: { success: "Le virement est parti, l'apprenti est payé, le compte 421 est apuré." }
        },
        10: {
            title: "Inventaire : Amortissement annuel du four",
            theory: "Votre four acheté 15 000 € perd de sa valeur. Amortissons-le sur 5 ans en linéaire.",
            exercise: {
                instruction: "Passez la dotation aux amortissements annuelle de la machine pour un montant calculé de 3 000 €.",
                accountsAllowed: ["6811", "2815"],
                expectedEntries: { "6811": { debit: 3000 }, "2815": { credit: 3000 } }
            },
            explanation: { success: "La dépréciation de l'outil industriel est proprement intégrée en charge d'inventaire." }
        },
        11: {
            title: "Inventaire : Stock de farine de clôture",
            theory: "Au 31 décembre, il reste des sacs de farine inutilisés. Il faut constater ce stock à l'actif du bilan.",
            exercise: {
                instruction: "Enregistrez le stock de farine final évalué lors du comptage physique pour un montant de 1 500 €.",
                accountsAllowed: ["311", "6031"],
                expectedEntries: { "311": { debit: 1500 }, "6031": { credit: 1500 } }
            },
            explanation: { success: "Le stock est valorisé à l'actif, allégeant tes charges d'achats du même montant." }
        },
        12: {
            title: "Inventaire : Cession d'un ancien pétrin d'occasion",
            theory: "Vous vendez un vieux pétrin inutilisé à un confrère. C'est un produit exceptionnel de cession d'actif.",
            exercise: {
                instruction: "Enregistrez la facture de vente du vieux pétrin d'un montant de 2 000 € HT facturée à crédit à un client (411).",
                accountsAllowed: ["411", "775"],
                expectedEntries: { "411": { debit: 2000 }, "775": { credit: 2000 } }
            },
            explanation: { success: "Produit exceptionnel de cession validé !" }
        },
        13: {
            title: "Inventaire : Sortie de l'actif cédé du patrimoine",
            theory: "Pour finaliser la cession de l'étape précédente, il faut sortir la valeur d'origine de ce pétrin de votre actif.",
            exercise: {
                instruction: "Enregistrez la sortie du pétrin du bilan pour sa valeur d'origine historique qui était de 2 000 € (Débit 675 / Crédit 215).",
                accountsAllowed: ["675", "215"],
                expectedEntries: { "675": { debit: 2000 }, "215": { credit: 2000 } }
            },
            explanation: { success: "Le vieux pétrin est sorti des comptes de l'actif." }
        },
        14: {
            title: "Fiscalité : Liquidation de l'IS de la boulangerie",
            theory: "L'analyse du compte de résultat dégage un bénéfice. On calcule l'impôt sur les sociétés dû pour l'année, dette envers l'État qui s'enregistre au compte dédié <strong>444</strong>, jamais au 401 réservé à vos fournisseurs de farine.",
            exercise: {
                instruction: "Comptabilisez la charge d'Impôt sur les Sociétés (IS) annuelle pour un montant fixé à 1 500 €.",
                accountsAllowed: ["695", "444"],
                expectedEntries: { "695": { debit: 1500 }, "444": { credit: 1500 } }
            },
            explanation: { success: "Impôt acté au débit et dette fiscale envers l'État posée au passif (444), bien distincte de tes dettes fournisseurs." }
        },
    },

    // ==========================================
    // SIMULATEUR 2 : 💻 L'ÉDITEUR DE LOGICIELS SAAS (12 ÉTAPES)
    // ==========================================
    saas: {
        1: {
            title: "Mois 1 : Levée de fonds & Capital",
            theory: "Lancement de votre startup Tech. Vous accueillez des business angels pour financer le développement de la plateforme cloud.",
            exercise: {
                instruction: "Enregistrez la levée de fonds initiale : apport en capital social de 100 000 € reçus sur le compte bancaire.",
                accountsAllowed: ["512", "101"],
                expectedEntries: { "512": { debit: 100000 }, "101": { credit: 100000 } }
            },
            explanation: { success: "100K de cash en banque ! Le runway de la startup est lancé." }
        },
        2: {
            title: "Mois 2 : Activation des frais de R&D",
            theory: "Vos ingénieurs ont codé la V1 de l'application. En comptabilité tech, on peut capitaliser ces coûts de développement à l'actif sous forme d'immobilisation incorporelle.",
            exercise: {
                instruction: "Activez les frais de recherche et développement pour un montant de 30 000 € à l'actif (Débit 203 / Crédit 721).",
                accountsAllowed: ["203", "721"],
                expectedEntries: { "203": { debit: 30000 }, "721": { credit: 30000 } }
            },
            explanation: { success: "Frais de R&D activés à l'actif, ton compte de résultat est soulagé." }
        },
        3: {
            title: "Mois 3 : Facture de serveurs (Cloud AWS)",
            theory: "Pour faire tourner votre logiciel SaaS, vous louez de l'infrastructure cloud. C'est une charge d'exploitation récurrente — mais surtout pas un achat de matières premières (601, qui n'a aucun sens pour une entreprise qui ne fabrique rien de physique) : on utilise le compte <strong>606 - Achats Non Stockés</strong>, dédié aux consommations de services et fournitures non stockables.",
            exercise: {
                instruction: "Enregistrez la facture d'hébergement web cloud pour 4 000 € HT (+ 800 € de TVA déductible), payée par carte bancaire immédiatement.",
                accountsAllowed: ["606", "44566", "512"],
                expectedEntries: { "606": { debit: 4000 }, "44566": { debit: 800 }, "512": { credit: 4800 } }
            },
            explanation: { success: "Charge cloud AWS enregistrée sur le bon compte (606) et payée." }
        },
        4: {
            title: "Mois 6 : Encaissement des premiers abonnements annuels",
            theory: "Un client grand compte souscrit à votre offre SaaS pour un an. Il paie l'intégralité de l'abonnement annuel en avance.",
            exercise: {
                instruction: "Facturez un abonnement annuel de 12 000 € HT (+ 2 400 € de TVA collectée) encaissé immédiatement par virement bancaire.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 14400 }, "701": { credit: 12000 }, "44571": { credit: 2400 } }
            },
            explanation: { success: "Chiffre d'affaires encaissé ! Attention aux régularisations de fin d'année." }
        },
        5: {
            title: "Mois 9 : Vente à l'international (Risque de change)",
            theory: "Vous signez un contrat avec un client basé à New-York en Dollars ($). On convertit au cours du jour en Euros à crédit.",
            exercise: {
                instruction: "Enregistrez la facture client américaine pour une valeur convertie de 20 000 € au débit du compte client (411).",
                accountsAllowed: ["411", "701"],
                expectedEntries: { "411": { debit: 20000 }, "701": { credit: 20000 } }
            },
            explanation: { success: "Vente export validée à crédit." }
        },
        6: {
            title: "Mois 10 : Règlement US & Perte de change effective",
            theory: "Le client américain paie sa facture. Malheureusement, l'Euro a grimpé et le Dollar a baissé. Vous recevez moins de cash que prévu.",
            exercise: {
                instruction: "Le client solde sa créance de 20 000 €. La banque ne vous crédite que 19 000 € en Euros. Constatez la perte de change de 1 000 € au débit du 666.",
                accountsAllowed: ["512", "666", "411"],
                expectedEntries: { "512": { debit: 19000 }, "666": { debit: 1000 }, "411": { credit: 20000 } }
            },
            explanation: { success: "Écriture de change validée. Le risque monétaire est acté en perte financière." }
        },
        7: {
            title: "Mois 12 : Faillite client & Reclassement douteux",
            theory: "Un autre de vos clients français fait faillite. Sa créance de 5 000 € devient incertaine. Il faut la sortir des clients sains.",
            exercise: {
                instruction: "Reclassez la créance de 5 000 € du compte client générique (411) vers le compte client douteux (416).",
                accountsAllowed: ["416", "411"],
                expectedEntries: { "416": { debit: 5000 }, "411": { credit: 5000 } }
            },
            explanation: { success: "Créance isolée au débit du compte 416." }
        },
        8: {
            title: "Inventaire : Dotation pour dépréciation de créance",
            theory: "L'avocat confirme que vous ne récupérerez probablement que 20% de la créance de ce client en faillite. Il faut provisionner les 80% de perte probable (soit 4 000 €).",
            exercise: {
                instruction: "Passez la dotation aux dépréciations de créance pour un montant prudent de 4 000 € (Débit 656 / Crédit 416).",
                accountsAllowed: ["656", "416"],
                expectedEntries: { "656": { debit: 4000 }, "416": { credit: 4000 } }
            },
            explanation: { success: "Principe de prudence respecté. Ton résultat intègre le risque de non-paiement." }
        },
        9: {
            title: "Inventaire : Amortissement du logiciel activé",
            theory: "La plateforme logicielle activée au mois 2 (compte 203) perd de sa valeur technologique. Amortissons-la sur son propre compte d'amortissement immatériel <strong>2803</strong>, distinct de celui du matériel physique (2815) que cette startup ne possède pas.",
            exercise: {
                instruction: "Enregistrez l'amortissement annuel de la R&D pour une dotation linéaire de 6 000 €.",
                accountsAllowed: ["6811", "2803"],
                expectedEntries: { "6811": { debit: 6000 }, "2803": { credit: 6000 } }
            },
            explanation: { success: "Dotation immatérielle enregistrée sur le bon compte (2803), qui suit fidèlement la valeur nette de ton actif logiciel." }
        },
        10: {
            title: "Inventaire : Régularisation du cut-off (PCA)",
            theory: "L'abonnement annuel de 12 000 € HT encaissé au Mois 6 ne couvre que 6 mois sur l'exercice actuel. Les 6 mois restants concernent l'année prochaine et doivent être retirés via un compte de **Produit Constaté d'Avance (PCA)**.",
            exercise: {
                instruction: "Retirez 6 000 € HT du Chiffre d'Affaires pour les transférer au passif transitoire du compte PCA (Débit 701 / Crédit 487).",
                accountsAllowed: ["701", "487"],
                expectedEntries: { "701": { debit: 6000 }, "487": { credit: 6000 } }
            },
            explanation: { success: "Magnifique ! L'indépendance des exercices est respectée. Le Chiffre d'Affaires de cette année est propre." }
        },
        11: {
            title: "Fiscalité : Liquidation de l'IS de la startup",
            theory: "Malgré les investissements, l'activité SaaS dégage un bénéfice taxable en fin d'exercice. Cette dette fiscale se loge au compte dédié 444, jamais au 401 réservé à vos fournisseurs.",
            exercise: {
                instruction: "Enregistrez la charge d'Impôt sur les Sociétés calculée pour un montant de 3 000 €.",
                accountsAllowed: ["695", "444"],
                expectedEntries: { "695": { debit: 3000 }, "444": { credit: 3000 } }
            },
            explanation: { success: "IS comptabilisé à l'inventaire, sur le compte d'État qui lui est propre." }
        },
    },

    // ==========================================
    // SIMULATEUR 3 : 🏭 LE GROUPE INDUSTRIEL (12 ÉTAPES)
    // ==========================================
    industrie: {
        1: {
            title: "Mois 1 : Financement lourd de l'infrastructure",
            theory: "Démarrage du groupe industriel. L'achat de machines lourdes nécessite des capitaux et des dettes massives.",
            exercise: {
                instruction: "Enregistrez l'apport de capital de 200 000 € (101) et un prêt bancaire d'infrastructure de 300 000 € (164) reçus en banque.",
                accountsAllowed: ["512", "101", "164"],
                expectedEntries: { "512": { debit: 500000 }, "101": { credit: 200000 }, "164": { credit: 300000 } }
            },
            explanation: { success: "Demi-million disponible pour lancer l'usine !" }
        },
        2: {
            title: "Mois 2 : Installation des lignes de montage robotisées",
            theory: "Acquisition des robots d'assemblage à installer dans les ateliers de production.",
            exercise: {
                instruction: "Achetez des machines-outils industrielles pour une valeur de 150 000 € HT payées par chèque bancaire immédiatement.",
                accountsAllowed: ["215", "512"],
                expectedEntries: { "215": { debit: 150000 }, "512": { credit: 150000 } }
            },
            explanation: { success: "Les robots géants intègrent l'actif industriel." }
        },
        3: {
            title: "Mois 3 : Approvisionnement de matières premières (Acier)",
            theory: "Votre usine consomme de l'acier pour fabriquer ses pièces. C'est un achat de matières de classe 6.",
            exercise: {
                instruction: "Achetez des bobines d'acier pour 40 000 € HT (+ 8 000 € de TVA déductible), facturées à crédit par votre fournisseur sidérurgique.",
                accountsAllowed: ["601", "44566", "401"],
                expectedEntries: { "601": { debit: 40000 }, "44566": { debit: 8000 }, "401": { credit: 48000 } }
            },
            explanation: { success: "Dette et charge d'acier enregistrées." }
        },
        4: {
            title: "Mois 5 : Règlement du fournisseur d'acier",
            theory: "Apurons la dette d'exploitation sidérurgique par virement.",
            exercise: {
                instruction: "Réglez par virement bancaire la totalité de la facture du fournisseur pour un montant de 48 000 € TTC.",
                accountsAllowed: ["401", "512"],
                expectedEntries: { "401": { debit: 48000 }, "512": { credit: 48000 } }
            },
            explanation: { success: "Le compte 401 fournisseur revient proprement à zéro." }
        },
        5: {
            title: "Semestre 1 : Ventes de produits finis sortis d'usine",
            theory: "Vos équipes ont fabriqué et vendu de grosses machines industrielles à vos clients distributeurs.",
            exercise: {
                instruction: "Facturez vos ventes de produits finis pour 120 000 € HT (+ 24000 € de TVA collectée) réglées au comptant par virement.",
                accountsAllowed: ["512", "701", "44571"],
                expectedEntries: { "512": { debit: 144000 }, "701": { credit: 120000 }, "44571": { credit: 24000 } }
            },
            explanation: { success: "Trésorerie encaissée. Le Chiffre d'Affaires du groupe décolle." }
        },
        6: {
            title: "Mois 12 : Centralisation de la paie des ouvriers",
            theory: "Enregistrement mensuel de la masse salariale brute des équipes de production de l'usine. Le salaire brut (641) se décompose entre le net à payer au personnel (compte 421, jamais le 411 réservé aux clients) et les cotisations salariales retenues à la source pour l'URSSAF (431).",
            exercise: {
                instruction: "Enregistrez les salaires bruts des ateliers pour 20 000 € au débit du 641, avec 16 000 € de net à payer au personnel (Crédit 421) et 4 000 € de cotisations salariales retenues (Crédit 431).",
                accountsAllowed: ["641", "421", "431"],
                expectedEntries: { "641": { debit: 20000 }, "421": { credit: 16000 }, "431": { credit: 4000 } }
            },
            explanation: { success: "Salaire brut d'usine enregistré et parfaitement équilibré (20 000 € = 16 000 € + 4 000 €)." }
        },
        7: {
            title: "Mois 12 : Cotisations sociales URSSAF de l'usine",
            theory: "Ajoutons les cotisations d'exploitation à la charge du groupe industriel.",
            exercise: {
                instruction: "Passez l'écriture de charges patronales du mois pour un montant de 4 000 € due à l'URSSAF (compte 431).",
                accountsAllowed: ["645", "431"],
                expectedEntries: { "645": { debit: 4000 }, "431": { credit: 4000 } }
            },
            explanation: { success: "Charges sociales d'usine ajustées, le bilan s'équilibre à nouveau !" }
        },
        8: {
            title: "Étape 8 : Prise de Participation dans un Sous-Traitant Stratégique",
            theory: "Votre groupe industriel sécurise sa chaîne d'approvisionnement en prenant une part du capital d'un sous-traitant clé. Cet investissement durable s'enregistre à l'actif immobilisé, au compte <strong>261 - Titres de Participation</strong>, et non comme une charge d'exploitation. (Note : la consolidation complète des comptes d'un groupe — fusionner mère et filiales en un bilan unique — se fait sur un tableur de consolidation externe, jamais par une écriture directe dans les livres d'une seule entité.)",
            exercise: {
                instruction: "Investissez 50 000 € par virement bancaire dans les titres de participation d'un sous-traitant stratégique.",
                accountsAllowed: ["261", "512"],
                expectedEntries: { "261": { debit: 50000 }, "512": { credit: 50000 } }
            },
            explanation: { success: "Investissement stratégique acté à l'actif immobilisé (261), en échange d'une vraie sortie de trésorerie." }
        },
        9: {
            title: "Inventaire : Amortissement industriel linéaire",
            theory: "Vos robots de montage (achetés 150 000 € au Mois 2) s'usent rapidement à la chaîne. Amortissons-les sur 5 ans.",
            exercise: {
                instruction: "Calculez et passez la dotation aux amortissements annuelle des robots pour un montant de 30 000 €.",
                accountsAllowed: ["6811", "2815"],
                expectedEntries: { "6811": { debit: 30000 }, "2815": { credit: 30000 } }
            },
            explanation: { success: "30 000 € injectés en charge calculée pour déprécier ton parc machine." }
        },
        10: {
            title: "Inventaire : Stock d'acier restant (Matières)",
            theory: "Le comptage d'inventaire dans les hangars de stockage montre des bobines d'acier non utilisées.",
            exercise: {
                instruction: "Enregistrez le stock final de matières premières d'actif évalué à 10 000 € en magasin.",
                accountsAllowed: ["311", "6031"],
                expectedEntries: { "311": { debit: 10000 }, "6031": { credit: 10000 } }
            },
            explanation: { success: "Stock d'acier valorisé à l'actif." }
        },
        11: {
            title: "Inventaire : Stock de machines finies invendues (Produits)",
            theory: "En plus de l'acier, l'usine possède 3 grosses machines finies montées mais non encore vendues. C'est un **Stock de Produits Finis** (compte actif 355) à ajuster via la variation 713.",
            exercise: {
                instruction: "Constatez le stock final de produits finis invendus pour une valeur de production de 20 000 € (Débit 355 / Crédit 713).",
                accountsAllowed: ["355", "713"],
                expectedEntries: { "355": { debit: 20000 }, "713": { credit: 20000 } }
            },
            explanation: { success: "Sublime ! Le double flux de stock (Matières et Produits Finis) est parfaitement tracé au bilan d'inventaire." }
        },
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = academyScenarios;
}
