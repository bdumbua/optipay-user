// app/learning/page.tsx
"use client";

import AppLayout from "../components/AppLayout";

export default function LearningPage() {
  return (
    <AppLayout>
      {/* INTRO */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h1 className="text-xl font-semibold">
          Formations en finances personnelles
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Des contenus textes et vidéos pour mieux comprendre vos cartes,
          vos dettes et vos objectifs financiers. OptiPay ne fait pas
          qu’optimiser vos paiements, il vous aide aussi à comprendre
          vos décisions.
        </p>
      </section>

      {/* MODULES DE FORMATION */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">
          Parcours de formation
        </h2>
        <p className="text-slate-400 mb-4">
          Commencez par les bases, puis progressez vers des sujets plus
          avancés. Chaque module sera disponible en texte et en vidéo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-100">
                1. Les bases du budget
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
                Niveau débutant
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Comprendre vos revenus, vos dépenses fixes et variables,
              structurer un budget simple et réaliste.
            </p>
            <p className="text-[11px] text-slate-500">
              Contenu : articles + vidéos courtes (à venir)
            </p>
          </div>

          {/* Module 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-100">
                2. Bien utiliser ses cartes de crédit
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300">
                Niveau débutant
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Limites, taux d’intérêt, date d’échéance, utilisation
              intelligente des cartes pour éviter les frais.
            </p>
            <p className="text-[11px] text-slate-500">
              Contenu : guides illustrés + exemples concrets
            </p>
          </div>

          {/* Module 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-100">
                3. Récompenses, cashback et points
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300">
                Niveau intermédiaire
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Comprendre les programmes de récompenses, maximiser les points
              et le cashback sans surconsommer.
            </p>
            <p className="text-[11px] text-slate-500">
              Contenu : vidéos + cas pratiques
            </p>
          </div>

          {/* Module 4 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-100">
                4. Dettes, score de crédit et stratégies de remboursement
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300">
                Niveau intermédiaire
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              Comment analyser vos dettes, protéger votre cote de crédit,
              et mettre en place un plan de remboursement intelligent.
            </p>
            <p className="text-[11px] text-slate-500">
              Contenu : fiches PDF + vidéos explicatives
            </p>
          </div>
        </div>
      </section>

      {/* SECTION VIDEOS */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">
          Bibliothèque vidéo (à venir)
        </h2>
        <p className="text-slate-400 mb-3">
          Vous aurez bientôt accès à une bibliothèque de vidéos courtes sur
          la gestion de budget, les cartes de crédit, les dettes et
          l’optimisation des paiements.
        </p>
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
          🎥 Exemple de futur contenu :
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>“Comprendre les frais cachés de vos cartes de crédit”</li>
            <li>“Construire un budget simple en 15 minutes”</li>
            <li>“Cashback vs points : quoi choisir ?”</li>
          </ul>
        </div>
      </section>

      {/* SECTION ASSISTANT IA */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">
          Assistant IA (bientôt disponible)
        </h2>
        <p className="text-slate-400 mb-3">
          L’assistant IA OptiPay vous aidera à comprendre vos décisions
          financières, répondre à vos questions et expliquer pourquoi une
          carte est recommandée plutôt qu’une autre.
        </p>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm text-cyan-100 font-medium">
              “Quelle carte dois-je utiliser pour ce voyage ?”
            </p>
            <p className="text-xs text-cyan-100/80 mt-1">
              L’assistant IA analysera vos cartes, vos habitudes et les
              frais possibles pour vous guider.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700 cursor-not-allowed"
          >
            Assistant IA – bientôt disponible
          </button>
        </div>
      </section>
    </AppLayout>
  );
}
