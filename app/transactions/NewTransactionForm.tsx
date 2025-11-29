// app/transactions/NewTransactionForm.tsx
"use client";

import { useEffect, useState } from "react";
import type { Transaction } from "@/types/domain";
import { createTransaction } from "@/lib/api";

type Category =
  | "Épicerie"
  | "Restaurant"
  | "Essence"
  | "En ligne / e-commerce"
  | "Voyage"
  | "Autre";

type NewTransactionFormProps = {
  onTransactionCreated?: (tx: Transaction) => void;
  onError?: (message: string) => void;
};



export default function NewTransactionForm({
  onTransactionCreated,
}: NewTransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Épicerie");
  const [country, setCountry] = useState("Canada");
  const [date, setDate] = useState("");
  const [merchant, setMerchant] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedCardName, setSelectedCardName] = useState<string | null>(null);

  const userId = 1; // MVP

  useEffect(() => {
    const storedCardId = localStorage.getItem("optipay_selected_card_id");
    const storedCardName = localStorage.getItem("optipay_selected_card_name");

    if (storedCardId) setSelectedCardId(storedCardId);
    if (storedCardName) setSelectedCardName(storedCardName);
  }, []);

  // petit helper pour mapper la catégorie vers un MCC (MVP)
  const mapCategoryToMcc = (cat: Category): string => {
    switch (cat) {
      case "Épicerie":
        return "5411";
      case "Restaurant":
        return "5812";
      case "Essence":
        return "5541";
      case "En ligne / e-commerce":
        return "5999";
      case "Voyage":
        return "4511";
      default:
        return "0000";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dateTimeIso =
        date && date.length > 0
          ? new Date(date + "T12:00:00").toISOString()
          : new Date().toISOString();

      const mcc = mapCategoryToMcc(category);

      const created = await createTransaction({
        userId,
        cardId: selectedCardId ? Number(selectedCardId) : null,
        amountCad: Number(amount),
        mcc,
        country:
          country === "Canada"
            ? "CA"
            : country === "États-Unis"
            ? "US"
            : "OTHER",
        description: merchant || `${category} - transaction OptiPay`,
        dateTime: dateTimeIso,
      });

      // 🔥 Remonter la transaction créée au parent (TransactionsPage)
      if (onTransactionCreated) {
        onTransactionCreated(created);
      }

      // reset du formulaire (on garde la carte sélectionnée)
      setAmount("");
      setMerchant("");
      setDate("");
      setCategory("Épicerie");
      setCountry("Canada");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="new-transaction"
      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm"
    >
      {/* HEADER + CARTE SÉLECTIONNÉE */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold mb-1">
            Nouvelle transaction
          </h2>
          <p className="text-xs text-slate-400 max-w-sm">
            Renseignez les détails de votre transaction. OptiPay utilisera
            l&apos;IA pour recommander la meilleure carte.
          </p>
        </div>

        {selectedCardName ? (
          <div className="shrink-0 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-right">
            <div className="text-[10px] uppercase tracking-wide text-emerald-300">
              Carte sélectionnée
            </div>
            <div className="text-xs font-semibold text-emerald-100">
              {selectedCardName}
            </div>
          </div>
        ) : (
          <div className="shrink-0 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-right">
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Carte sélectionnée
            </div>
            <div className="text-xs text-slate-400">
              Aucune – l&apos;IA choisira
            </div>
          </div>
        )}
      </div>

      {/* FORMULAIRE */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* MONTANT */}
          <div>
            <label className="block text-slate-400 mb-1">Montant</label>
            <div className="flex rounded-xl border border-slate-700 bg-slate-950">
              <span className="px-3 py-2 text-slate-400 text-xs border-r border-slate-800">
                CAD
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="Ex. 85.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2 text-slate-50 text-sm focus:outline-none"
                required
              />
            </div>
          </div>

          {/* CATÉGORIE */}
          <div>
            <label className="block text-slate-400 mb-1">Catégorie</label>
            <select
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
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
          {/* PAYS */}
          <div>
            <label className="block text-slate-400 mb-1">Pays</label>
            <select
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>Canada</option>
              <option>États-Unis</option>
              <option>Autre</option>
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="block text-slate-400 mb-1">Date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* COMMERÇANT */}
        <div>
          <label className="block text-slate-400 mb-1">
            Nom du commerçant (optionnel)
          </label>
          <input
            type="text"
            placeholder="Ex. Métro, Amazon, Shell…"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300 disabled:opacity-60"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer la transaction"}
          </button>
        </div>
      </form>

      <p className="mt-2 text-[11px] text-slate-500">
        (Dans la version finale, le backend calculera la carte optimale en
        fonction de vos cartes et du contexte de la transaction.)
      </p>
    </section>
  );
}
