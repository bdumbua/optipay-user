// app/dashboard/page.tsx
"use client";

import CardPickerSection from "../components/CardPickerSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type SavingsPoint = {
  cardId: number;
  cardName: string;
  saved: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // Données mockées : gains moyens par carte
  const savingsData: SavingsPoint[] = [
    { cardId: 1, cardName: "Visa Infinite TD", saved: 12.3 },
    { cardId: 2, cardName: "Amex Cobalt", saved: 18.7 },
    { cardId: 3, cardName: "World Elite MC", saved: 9.4 },
  ];

  const displayedData =
    selectedCardId != null
      ? savingsData.filter((s) => s.cardId === selectedCardId)
      : savingsData;

  useEffect(() => {
    const email = localStorage.getItem("optipay_user_email");
    if (email) {
      const namePart = email.split("@")[0];
      const prettyName =
        namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setUserName(prettyName);
    } else {
      setUserName("Alex");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("optipay_user_email");
    router.push("/login");
  };

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
            <span className="text-slate-400 hidden sm:inline">
              Bonjour, {userName || "Alex"}
            </span>
            <button className="px-3 py-1 rounded-lg border border-slate-700 text-xs hover:bg-slate-800">
              Mon compte
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-lg bg-slate-800 text-xs hover:bg-slate-700"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* SIDEBAR */}
        <nav className="hidden md:flex w-56 flex-col gap-2 text-sm">
          <div className="text-xs uppercase text-slate-500 mb-1">
            Navigation
          </div>
          <a className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Tableau de bord
          </a>
          <a
            href="/cards"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            Mes cartes
          </a>
          <a
            href="/transactions"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
            Transactions
          </a>
        </nav>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-4">
          {/* WELCOME / QUICK ACTIONS */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">
                Bienvenue sur OptiPay
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Ajoutez vos cartes et laissez l’IA choisir la meilleure pour
                chaque paiement.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/transactions"
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
              >
                Nouvelle transaction
              </a>
              <a
                href="/cards"
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800"
              >
                Ajouter une carte
              </a>
            </div>
          </section>

          {/* CARTES = CONTROLEUR DU GRAPHE */}
          <CardPickerSection
            variant="dashboard"
            onCardSelect={(cardId) => setSelectedCardId(cardId)}
          />

          {/* GRILLE : recommandations + graphe */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* DERNIÈRES RECOMMANDATIONS */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
              <h2 className="text-base font-semibold mb-3">
                Dernières recommandations
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-100">
                      85,00 $ • Épicerie
                    </div>
                    <div className="text-xs text-slate-400">
                      Carte utilisée : Visa Infinite TD • 2,55 $ économisés
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    Optimisé
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-100">
                      42,90 $ • Restaurant
                    </div>
                    <div className="text-xs text-slate-400">
                      Carte utilisée : Amex Cobalt • 4x points
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    Optimisé
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-100">
                      120,00 $ • En ligne
                    </div>
                    <div className="text-xs text-slate-400">
                      Carte utilisée : MC World • Frais réduits
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    Optimisé
                  </span>
                </li>
              </ul>
            </section>

            {/* GRAPHE DES ÉCONOMIES PAR CARTE */}
            <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
              <div className="flex items-center justify-between mb-3 gap-2">
                <h2 className="text-base font-semibold">
                  Économies par carte
                </h2>
                <button
                  className="px-3 py-1 rounded-xl border border-slate-700 text-xs hover:bg-slate-800"
                  onClick={() => setSelectedCardId(null)}
                >
                  Toutes les cartes
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Montants économisés estimés par carte sur vos transactions
                optimisées.
              </p>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={displayedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#203b1eff" />
                    <XAxis dataKey="cardName" stroke="#94b895ff" />
                    <YAxis
                      stroke="#94a3b8"
                      tickFormatter={(v) => `${(v as number).toFixed(1)} $`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#030303ff",
                        borderColor: "#1e293b",
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [
                        `${value.toFixed(2)} $`,
                        "Économisé",
                      ]}
                    />
                    <Bar
                      dataKey="saved"
                      radius={[6, 6, 0, 0]}
                      fill="#10b981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
