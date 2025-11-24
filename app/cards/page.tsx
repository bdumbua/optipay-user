// app/cards/page.tsx
import Link from "next/link";

export default function CardsPage() {
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
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Mes cartes
          </div>
          <Link
            href="/transactions"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            Transactions
          </Link>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-4">
          {/* HEADER SECTION */}
          <section className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Mes cartes</h1>
              <p className="text-sm text-slate-400 mt-1">
                Ajoutez vos cartes de crédit pour que l’IA puisse les optimiser.
              </p>
            </div>
            <a
              href="#add-card"
              className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
            >
              Ajouter une carte
            </a>
          </section>

          {/* LISTE DES CARTES */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
            <h2 className="text-base font-semibold mb-3">Cartes enregistrées</h2>

            <div className="space-y-3">
              {/* Carte 1 (exemple) */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <div>
                  <div className="font-medium text-slate-100">Visa Infinite TD</div>
                  <div className="text-xs text-slate-400">
                    Banque : TD • Réseau : Visa • Cashback 3% épicerie
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <button className="px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-900">
                    Modifier
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-rose-700 text-rose-300 hover:bg-rose-950/40">
                    Supprimer
                  </button>
                </div>
              </div>

              {/* Carte 2 (exemple) */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <div>
                  <div className="font-medium text-slate-100">Amex Cobalt</div>
                  <div className="text-xs text-slate-400">
                    Banque : Amex • Réseau : Amex • 5x points restaurants
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <button className="px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-900">
                    Modifier
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-rose-700 text-rose-300 hover:bg-rose-950/40">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>

            {/* ÉTAT VIDE (pour plus tard) */}
            {/* 
            <p className="text-sm text-slate-400">
              Vous n’avez pas encore ajouté de carte. Cliquez sur “Ajouter une carte” pour commencer.
            </p>
            */}
          </section>

          {/* FORMULAIRE AJOUT / MODIF */}
          <section
            id="add-card"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm"
          >
            <h2 className="text-base font-semibold mb-3">Ajouter une nouvelle carte</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">Nom de la carte</label>
                <input
                  type="text"
                  placeholder="Ex. Visa Infinite TD"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Banque</label>
                  <input
                    type="text"
                    placeholder="Ex. TD, Desjardins…"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Réseau</label>
                  <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>Amex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Type de récompense</label>
                  <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
                    <option>Cashback</option>
                    <option>Points</option>
                    <option>Aucune</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Taux principal (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Ex. 1% cashback, 2 points / $"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
                >
                  Enregistrer la carte
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
