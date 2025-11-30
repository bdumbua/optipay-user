// app/transactions/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import CardPickerSection from "../components/CardPickerSection";
import NewTransactionForm from "./NewTransactionForm";
import { fetchTransactions, deleteTransaction } from "@/lib/api";
import type { Transaction } from "@/types/domain";
import AppLayout from "../components/AppLayout";
import Alert from "../components/Alert";
import Link from "next/link";
import CsvImportPanel from "../components/CsvImportPanel";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  // messages de feedback
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

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

  // Filtre par carte
  const filteredTransactions =
    selectedCardId != null
      ? transactions.filter((tx) => tx.cardId === selectedCardId)
      : transactions;

  // Pagination simple côté front : 20 dernières + "Voir plus"
  const [visibleCount, setVisibleCount] = useState(20);

  // Quand le filtre ou la liste change, on repart à 20
  useEffect(() => {
    setVisibleCount(20);
  }, [selectedCardId, transactions.length]);

  // Tri par date décroissante (les plus récentes en premier)
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      const da = new Date(a.dateTime).getTime();
      const db = new Date(b.dateTime).getTime();
      return db - da;
    });
  }, [filteredTransactions]);

  const visibleTransactions = sortedTransactions.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedTransactions.length;

  async function handleDelete(tx: Transaction) {
    const ok = window.confirm(
      `Supprimer la transaction de ${tx.amountCad.toFixed(
        2
      )} $ (« ${tx.description} ») ?`
    );
    if (!ok) return;

    try {
      await deleteTransaction(userId, tx.id);
      // retirer de la liste locale
      setTransactions((prev) => prev.filter((t) => t.id !== tx.id));

      setSuccessMessage("Transaction supprimée avec succès ✅");
      setErrorMessage(null);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (e: any) {
      setErrorMessage(
        e.message ?? "Erreur lors de la suppression de la transaction."
      );
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }

  function handleTransactionCreated(newTx: Transaction) {
    setTransactions((prev) => [...prev, newTx]);
    setSuccessMessage("Transaction ajoutée avec succès ✅");
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 4000);
  }

  return (
    <AppLayout>
      {/* HEADER SECTION */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold">Transactions</h1>
          <p className="text-sm text-slate-400 mt-1">
            Consultez vos transactions et ajoutez-en de nouvelles.
          </p>
        </div>
        <Link
          href="/recommendations"
          className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
        >
          Simuler une recommandation
        </Link>
      </section>

      {/* ALERTES GLOBALES */}
      {successMessage && (
        <Alert kind="success">{successMessage}</Alert>
      )}
      {warningMessage && (
        <Alert kind="warning">{warningMessage}</Alert>
      )}
      {errorMessage && <Alert kind="error">{errorMessage}</Alert>}

      {/* FILTRE PAR CARTE */}
      <CardPickerSection
        variant="transactions"
        onCardSelect={(cardId) => setSelectedCardId(cardId)}
      />

      {/* PANEL IMPORT CSV */}
      <CsvImportPanel selectedCardId={selectedCardId} />

      {/* GRILLE : HISTORIQUE + FORMULAIRE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* HISTORIQUE FILTRÉ */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h2 className="text-base font-semibold">
              Historique des transactions
            </h2>
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

          {loading ? (
            <p className="text-slate-400 text-sm">Chargement...</p>
          ) : error ? (
            <p className="text-rose-300 text-sm">
              Erreur lors du chargement des transactions : {error}
            </p>
          ) : sortedTransactions.length === 0 ? (
            <p className="text-slate-400 text-sm">
              Aucune transaction à afficher pour ce filtre.
            </p>
          ) : (
            <>
              <div className="space-y-2">
                {visibleTransactions.map((tx) => (
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
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>
                        {new Date(tx.dateTime).toLocaleString("fr-CA")}
                      </span>
                      <button
                        className="px-2 py-1 rounded-lg border border-rose-700 text-rose-300 hover:bg-rose-950/40"
                        onClick={() => handleDelete(tx)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {canLoadMore && (
                <div className="mt-3 flex justify-center">
                  <button
                    className="px-4 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200 hover:bg-slate-800"
                    onClick={() => setVisibleCount((c) => c + 20)}
                  >
                    Voir plus de transactions
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* FORMULAIRE NOUVELLE TRANSACTION */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
          <h2 className="text-base font-semibold mb-3">
            Ajouter une nouvelle transaction
          </h2>
          <NewTransactionForm
            
            onTransactionCreated={handleTransactionCreated}
            onError={(msg) => {
              setErrorMessage(msg);
              setTimeout(() => setErrorMessage(null), 5000);
            }}
          />
        </section>
      </div>
    </AppLayout>
  );
}
