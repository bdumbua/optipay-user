// app/transactions/page.tsx
import Link from "next/link";

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-cyan-400 flex items-center justify-center font-bold text-slate-900">
              O
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">OptiPay</span>
              <span className="text-xs text-slate-400">
                La carte virtuelle, propulsée par l’IA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400 hidden sm:inline">Bonjour, Alex</span>
            <button className="px-3 py-1 rounded-lg border border-slate-700 text-xs hover:bg-slate-800">
              Mon compte
            </button>
            <button className="px-3 py-1 rounded-lg bg-slate-800 text-xs hover:bg-slate-700">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* SIDEBAR */}
        <nav className="hidden md:flex w-56 flex-col gap-2 text-sm">
          <div className="text-xs uppercase text-slate-500 mb-1">Navigation</div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            Tableau de bord
          </Link>
          <Link
            href="/cards"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            Mes cartes
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Transactions
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-4">
          <section className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">
                Nouvelle transaction
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Saisissez une transaction et laissez l’IA recommander la meilleure
                carte.
              </p>
            </div>
          </section>

          {/* FORMULAIRE */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Montant</label>
                  <div className="flex rounded-xl border border-slate-700 bg-slate-950">
                    <span className="px-3 py-2 text-slate-400 text-xs border-r border-slate-800">
                      CAD
                    </span>
                    <input
                      type="number"
                      placeholder="Ex. 85.00"
                      className="flex-1 bg-transparent px-3 py-2 text-slate-50 text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Catégorie</label>
                  <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
                    <option>Épicerie</option>
                    <option>Restaurant</option>
                    <option>Essence</option>
                    <option>En ligne / e-commerce</option>
                    <option>Voyage</option>
                    <option>Autre</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Pays</label>
                  <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
                    <option>Canada</option>
                    <option>États-Unis</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Nom du commerçant (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Ex. Métro, Amazon, Shell…"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
                >
                  Obtenir une recommandation
                </button>
              </div>
            </form>
          </section>

          {/* BLOC RECOMMANDATION (mock pour l’instant) */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
            <h2 className="text-base font-semibold mb-2">
              Carte recommandée (exemple)
            </h2>
            <div className="rounded-2xl border border-emerald-500/40 bg-slate-950/70 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 rounded-full bg-cyan-400 text-slate-950 items-center justify-center text-xs font-bold">
                    V
                  </span>
                  Visa Infinite TD
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  +3% de cashback sur l’épicerie • Aucun frais de change • Score
                  IA : <span className="text-emerald-400">92/100</span>
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-2 text-xs">
                <span className="text-emerald-400 font-medium">
                  Économie estimée : 2,55 $
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400">
                    Valider la transaction
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-900">
                    Modifier
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              (Dans la vraie application, ce bloc sera rempli avec la recommandation
              réelle de l’IA après l’envoi du formulaire.)
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
