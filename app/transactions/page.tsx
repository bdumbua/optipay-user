"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CardPickerSection from "../components/CardPickerSection";
import NewTransactionForm from "./NewTransactionForm";
import AppHeader from "../components/AppHeader";
import { fetchTransactions } from "@/lib/api";
import type { Transaction } from "@/types/domain";
import AppSidebar from "../components/AppSidebar";
import AppFooter from "../components/AppFooter";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // MVP : userId fixe, aligné avec ce qu'on a fait pour les cartes
  const userId = 1;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTransactions(userId);
        setTransactions(data);
      } catch (e: any) {
        setError(e.message ?? "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const filteredTransactions =
    selectedCardId != null
      ? transactions.filter((tx) => tx.cardId === selectedCardId)
      : transactions;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <AppHeader />

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* SIDEBAR */}
        <AppSidebar />

        {/* CONTENT */}
        <main className="flex-1 flex flex-col gap-4">
          {/* CARTES = FILTRE */}
          <CardPickerSection
            variant="transactions"
            onCardSelect={(cardId) => setSelectedCardId(cardId)}
          />

          {/* HISTORIQUE FILTRÉ */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h1 className="text-base font-semibold">
                Historique des transactions
              </h1>
              <div className="flex items-center gap-2">
                {selectedCardId != null && (
                  <span className="text-[11px] text-emerald-300 border border-emerald-500/40 rounded-full px-2 py-0.5">
                    Filtré par carte #{selectedCardId}
                  </span>
                )}
                <button
                  className="px-3 py-1 rounded-xl border border-slate-700 text-xs hover:bg-slate-800"
                  onClick={() => setSelectedCardId(null)}
                >
                  Afficher toutes les cartes
                </button>
              </div>
            </div>

            <button className="mb-3 px-3 py-1 rounded-xl border border-slate-700 text-xs hover:bg-slate-800">
              Synchroniser avec ma banque / Importer CSV
            </button>

            {loading ? (
              <p className="text-slate-400 text-sm">Chargement...</p>
            ) : error ? (
              <p className="text-rose-300 text-sm">
                Erreur lors du chargement des transactions : {error}
              </p>
            ) : filteredTransactions.length === 0 ? (
              <p className="text-slate-400 text-sm">
                Aucune transaction à afficher pour ce filtre.
              </p>
            ) : (
              <div className="space-y-2">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/40"
                  >
                    <div>
                      <div className="font-medium text-slate-100">
                        {tx.amountCad.toFixed(2)} $ • {tx.description}
                      </div>
                      <div className="text-xs text-slate-400">
                        Carte #{tx.cardId} • MCC {tx.mcc} • Pays {tx.country}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(tx.dateTime).toLocaleString("fr-CA")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* FORMULAIRE (indépendant des cartes) */}
          <NewTransactionForm />
        </main>
      </div>
      <AppFooter />
    </div>
  );
}
