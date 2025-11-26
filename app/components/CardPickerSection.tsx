// app/components/CardPickerSection.tsx
"use client";

import { useEffect, useState } from "react";

type CardOption = {
  id: number;
  name: string;
  network: "VISA" | "MASTERCARD" | "AMEX";
  accent: string;
  bg: string;
  initial: string;
};

const MOCK_CARDS: CardOption[] = [
  {
    id: 1,
    name: "Visa Infinite TD",
    network: "VISA",
    accent: "from-emerald-400 to-cyan-400",
    bg: "bg-gradient-to-br from-emerald-500/20 to-cyan-500/10",
    initial: "V",
  },
  {
    id: 2,
    name: "Amex Cobalt",
    network: "AMEX",
    accent: "from-sky-400 to-indigo-400",
    bg: "bg-gradient-to-br from-sky-500/20 to-indigo-500/10",
    initial: "A",
  },
  {
    id: 3,
    name: "World Elite MC",
    network: "MASTERCARD",
    accent: "from-amber-400 to-rose-400",
    bg: "bg-gradient-to-br from-amber-500/20 to-rose-500/10",
    initial: "M",
  },
];

type Props = {
  variant?: "transactions" | "dashboard";
  onCardSelect?: (cardId: number) => void;
};

export default function CardPickerSection({
  variant = "transactions",
  onCardSelect,
}: Props) {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("optipay_selected_card_id");
    if (stored) {
      setSelectedCardId(Number(stored));
    }
  }, []);

  const handleSelectCard = (card: CardOption) => {
    setSelectedCardId(card.id);
    localStorage.setItem("optipay_selected_card_id", String(card.id));
    localStorage.setItem("optipay_selected_card_name", card.name);
    if (onCardSelect) onCardSelect(card.id);
  };

  const subtitle =
    variant === "transactions"
      ? "Cliquez sur une carte pour afficher uniquement ses transactions."
      : "Cliquez sur une carte pour filtrer le graphique des gains.";

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
      <h2 className="text-base font-semibold mb-2">Vos cartes OptiPay</h2>
      <p className="text-xs text-slate-400 mb-3">{subtitle}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MOCK_CARDS.map((card) => {
          const isSelected = selectedCardId === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleSelectCard(card)}
              className={`relative overflow-hidden rounded-2xl border p-3 text-left transition 
                ${card.bg}
                ${
                  isSelected
                    ? "border-emerald-400/80 shadow-lg shadow-emerald-500/20"
                    : "border-slate-800 hover:border-slate-600"
                }
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex h-8 w-8 rounded-full bg-slate-950/80 items-center justify-center text-xs font-bold border border-slate-700">
                  {card.initial}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-slate-400">
                  {card.network}
                </span>
              </div>

              <div className="font-semibold text-slate-50 text-sm mb-1">
                {card.name}
              </div>
              <div className="text-[11px] text-slate-400">
                Carte compatible OptiPay • Optimisation IA
              </div>

              <div
                className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${card.accent}`}
              />

              {isSelected && (
                <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Sélectionnée
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        (Plus tard, cette liste viendra de vos cartes réelles configurées dans
        OptiPay.)
      </p>
    </section>
  );
}
