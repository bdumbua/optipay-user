"use client";

import { useState } from "react";
import Link from "next/link";
import CardPickerSection from "../components/CardPickerSection";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";

type SavingsPoint = {
  cardId: number;
  cardName: string;
  saved: number;
};

export default function DashboardPage() {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // Données mockées : gains moyens par carte (pour le MVP)
  const savingsData: SavingsPoint[] = [
    { cardId: 1, cardName: "Visa Infinite TD", saved: 12.3 },
    { cardId: 2, cardName: "Amex Cobalt", saved: 18.7 },
    { cardId: 3, cardName: "World Elite MC", saved: 9.4 },
  ];

  const displayedData =
    selectedCardId != null
      ? savingsData.filter((s) => s.cardId === selectedCardId)
      : savingsData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER harmonisé */}
      <AppHeader />

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* SIDEBAR (même style que /cards et /transactions) */}
        <AppSidebar />

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
              <Link
                href="/transactions"
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
              >
                Nouvelle transaction
              </Link>
              <Link
                href="/cards"
                className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800"
              >
                Ajouter une carte
              </Link>
            </div>
          </section>

          {/* CARTES = CONTROLEUR DU GRAPHE */}
          <CardPickerSection
            variant="dashboard"
            onCardSelect={(cardId) => setSelectedCardId(cardId)}
          />

          {/* GRILLE : recommandations + graphe */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* DERNIÈRES RECOMMANDATIONS (mock pour MVP) */}
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

            {/* GRAPHE DES ÉCONOMIES PAR CARTE (mocké pour l'instant) */}
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
          {/* ENCARt FORMATIONS FINANCIÈRES */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
            <div>
              <h2 className="text-base font-semibold">
                Se former en finances personnelles
              </h2>
              <p className="text-slate-400 mt-1">
                Découvrez des contenus textes et vidéos pour mieux gérer votre
                budget, vos cartes de crédit et vos dettes.
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              <a
                href="/learning"
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
              >
                Voir les formations
              </a>
              <p className="text-[11px] text-slate-500">
                Bientôt accompagné par l&apos;assistant IA OptiPay.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
