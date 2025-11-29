// app/dashboard/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import CardPickerSection from "../components/CardPickerSection";
import AppLayout from "../components/AppLayout";
import { fetchOverviewStats } from "@/lib/api";
import type { OverviewStats } from "@/types/domain";

export default function DashboardPage() {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorStats, setErrorStats] = useState<string | null>(null);

  const userId = 1; // MVP

  useEffect(() => {
    setLoadingStats(true);
    setErrorStats(null);

    fetchOverviewStats(userId)
      .then(setStats)
      .catch((e: any) =>
        setErrorStats(
          e?.message ??
            "Erreur lors du chargement des statistiques. Réessayez plus tard."
        )
      )
      .finally(() => setLoadingStats(false));
  }, [userId]);

  // Données pour le graphe à partir des stats backend
  const displayedData = useMemo(() => {
    if (!stats) return [];
    let data = stats.byCard.map((c) => ({
      cardId: c.cardId,
      cardName: c.cardName,
      // on affiche le total dépensé par carte pour le moment
      totalAmount: c.totalAmount,
      count: c.count,
    }));
    if (selectedCardId != null) {
      data = data.filter((d) => d.cardId === selectedCardId);
    }
    return data;
  }, [stats, selectedCardId]);

  return (
    <AppLayout>
      {/* WELCOME / QUICK ACTIONS */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">
            Bienvenue sur OptiPay
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ajoutez vos cartes et laissez l’IA choisir la meilleure pour chaque
            paiement.
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

      {/* PETITES CARTES DE STATS (montant, nb tx, nb cartes) */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs text-slate-400">Montant total</div>
          <div className="mt-1 text-xl font-semibold">
            {stats ? `${stats.totalAmount.toFixed(2)} $` : "--"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Somme de toutes vos transactions
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs text-slate-400">Nombre de transactions</div>
          <div className="mt-1 text-xl font-semibold">
            {stats ? stats.totalCount : "--"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Depuis le début de l&apos;historique
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="text-xs text-slate-400">Cartes actives</div>
          <div className="mt-1 text-xl font-semibold">
            {stats ? stats.byCard.length : "--"}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Cartes ayant au moins une transaction
          </div>
        </div>
      </section>

      {/* CARTES = CONTROLEUR DU GRAPHE */}
      <CardPickerSection
        variant="dashboard"
        onCardSelect={(cardId) => setSelectedCardId(cardId)}
      />

      {/* GRILLE : recommandations + graphe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* DERNIÈRES RECOMMANDATIONS (mock pour l'instant) */}
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

        {/* GRAPHE DES MONTANTS PAR CARTE (réel) */}
        <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h2 className="text-base font-semibold">Montants par carte</h2>
            <button
              className="px-3 py-1 rounded-xl border border-slate-700 text-xs hover:bg-slate-800"
              onClick={() => setSelectedCardId(null)}
            >
              Toutes les cartes
            </button>
          </div>

          {loadingStats ? (
            <p className="text-xs text-slate-400">
              Chargement des statistiques…
            </p>
          ) : errorStats ? (
            <p className="text-xs text-rose-300">{errorStats}</p>
          ) : !stats || displayedData.length === 0 ? (
            <p className="text-xs text-slate-400">
              Aucune transaction enregistrée pour le moment. Ajoutez des
              transactions pour voir vos statistiques.
            </p>
          ) : (
            <>
              <p className="text-xs text-slate-400 mb-3">
                Montants totaux dépensés par carte, basés sur vos transactions
                enregistrées.
              </p>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={displayedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#203b1e" />
                    <XAxis dataKey="cardName" stroke="#94a3b8" />
                    <YAxis
                      stroke="#94a3b8"
                      tickFormatter={(v) => `${(v as number).toFixed(0)} $`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#030712",
                        borderColor: "#1e293b",
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [
                        `${value.toFixed(2)} $`,
                        "Montant total",
                      ]}
                    />
                    <Bar
                      dataKey="totalAmount"
                      radius={[6, 6, 0, 0]}
                      fill="#10b981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
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
    </AppLayout>
  );
}
