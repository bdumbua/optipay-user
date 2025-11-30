// app/help/page.tsx
"use client";

import AppLayout from "../components/AppLayout";

export default function HelpPage() {
  return (
    <AppLayout>
      {/* SECTION 1 — INTRO */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h1 className="text-xl font-semibold">Aide & Support</h1>
        <p className="text-sm text-slate-400 mt-1">
          Vous trouverez ici les réponses aux questions fréquentes et comment utiliser OptiPay.
        </p>
      </section>

      {/* SECTION 2 — COMMENT UTILISER OPTIPAY */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">
          Comment utiliser OptiPay
        </h2>

        <ul className="space-y-3">
          <li>
            <span className="font-medium text-slate-100">
              1. Ajoutez vos cartes de crédit.
            </span>
            <p className="text-slate-400">
              Rendez-vous dans <span className="text-cyan-300">Mes cartes</span> et entrez votre carte
              (banque, réseau, récompenses...).
            </p>
          </li>

          <li>
            <span className="font-medium text-slate-100">
              2. Entrez vos transactions.
            </span>
            <p className="text-slate-400">
              Dans <span className="text-cyan-300">Transactions</span>, vous pouvez ajouter un paiement manuellement
              pour que l’IA puisse apprendre de vos habitudes.
            </p>
          </li>

          <li>
            <span className="font-medium text-slate-100">
              2 bis. Importez un relevé CSV par carte.
            </span>
            <p className="text-slate-400">
              Toujours dans <span className="text-cyan-300">Transactions</span>, sélectionnez d&apos;abord une{" "}
              <span className="font-medium">carte</span> dans le filtre en haut de la page. Ensuite, utilisez la
              section <span className="text-cyan-300">Importer un relevé bancaire (CSV)</span> pour charger
              un fichier correspondant à cette carte. Les transactions importées seront rattachées à la carte
              actuellement sélectionnée, comme l&apos;historique affiché.
            </p>
          </li>

          <li>
            <span className="font-medium text-slate-100">
              3. Consultez la recommandation d’OptiPay.
            </span>
            <p className="text-slate-400">
              Allez dans <span className="text-cyan-300">Recommandations</span>, entrez un montant et le type d’achat,
              OptiPay vous suggère la meilleure carte.
            </p>
          </li>

          <li>
            <span className="font-medium text-slate-100">
              4. Optimisez votre mois.
            </span>
            <p className="text-slate-400">
              Le <span className="text-cyan-300">Tableau de bord</span> vous montre vos économies et les cartes les plus performantes.
            </p>
          </li>
        </ul>
      </section>

      {/* SECTION 3 — FAQ */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">FAQ</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-slate-100">
              OptiPay utilise-t-il mes données bancaires ?
            </h3>
            <p className="text-slate-400">
              Non. Pour le moment, tout est manuel ou basé sur des fichiers CSV chargés par vous.
              Plus tard, l’intégration open banking sera proposée.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-slate-100">
              Puis-je importer mes transactions depuis un fichier CSV ?
            </h3>
            <p className="text-slate-400">
              Oui. Sur la page <span className="text-cyan-300">Transactions</span>, vous pouvez importer un relevé
              au format CSV pour une carte donnée. Sélectionnez d&apos;abord la carte dans le filtre, puis utilisez
              la section <span className="text-cyan-300">Importer un relevé bancaire (CSV)</span>.
            </p>
            <p className="text-slate-400 mt-1">
              Le format minimal recommandé est :
            </p>
            <p className="text-slate-300 text-xs mt-1">
              <code className="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                date, description, montant, devise
              </code>
            </p>
            <ul className="list-disc list-inside text-xs text-slate-400 mt-2 space-y-1">
              <li>
                <span className="font-medium text-slate-300">date</span> : au format{" "}
                <code className="bg-slate-950 border border-slate-800 rounded px-1">
                  YYYY-MM-DD
                </code>{" "}
                (ou avec heure :{" "}
                <code className="bg-slate-950 border border-slate-800 rounded px-1">
                  YYYY-MM-DD HH:MM
                </code>
                ).
              </li>
              <li>
                <span className="font-medium text-slate-300">montant</span> : nombre avec un point comme
                séparateur décimal, par exemple <code>123.45</code>.
              </li>
              <li>
                <span className="font-medium text-slate-300">devise</span> : par exemple{" "}
                <code>CAD</code>, <code>USD</code>, etc.
              </li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Dans cette version MVP, l&apos;import CSV est surtout une aide à la saisie : certains traitements
              avancés seront ajoutés plus tard.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-slate-100">
              Comment l’IA choisit-elle la meilleure carte ?
            </h3>
            <p className="text-slate-400">
              Une combinaison d’un moteur de règles optimisées et d’un modèle d’apprentissage automatique,
              entraîné à partir de vos transactions et des caractéristiques de vos cartes.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-slate-100">
              Est-ce gratuit ?
            </h3>
            <p className="text-slate-400">
              Le MVP est 100% gratuit. Des fonctionnalités premium arriveront plus tard.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CONTACT */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">Nous contacter</h2>

        <p className="text-slate-400 mb-4">
          Une question ? Un problème ? Envoyez-nous un message.
        </p>

        <form className="space-y-3 max-w-md">
          <div>
            <label className="block text-slate-400 mb-1">Votre email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2"
              placeholder="vous@example.com"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Message</label>
            <textarea
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 h-28"
              placeholder="Expliquez votre question..."
            />
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
          >
            Envoyer
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-3">
          Ou contactez-nous directement :{" "}
          <span className="text-cyan-300">support@optipay.ca</span>
        </p>
      </section>
    </AppLayout>
  );
}
