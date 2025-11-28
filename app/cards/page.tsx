"use client";

import { useEffect, useState } from "react";
import { fetchCards, createCard } from "@/lib/api";
import type { Card } from "@/types/domain";
import AppLayout from "../components/AppLayout";

type RewardType = "Cashback" | "Points" | "Aucune";

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formulaire ajout
  const [cardName, setCardName] = useState("");
  const [bank, setBank] = useState("");
  const [network, setNetwork] = useState<"Visa" | "Mastercard" | "Amex">(
    "Visa"
  );
  const [rewardType, setRewardType] = useState<RewardType>("Cashback");
  const [mainRate, setMainRate] = useState(""); // ex. "1" pour 1% ou "4" pour 4x points
  const [savingCard, setSavingCard] = useState(false);

  const userId = 1; // MVP

  useEffect(() => {
    setLoading(true);
    fetchCards(userId)
      .then(setCards)
      .catch((e: any) => setError(e.message ?? "Erreur inconnue"))
      .finally(() => setLoading(false));
  }, [userId]);

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    setSavingCard(true);
    setError(null);

    try {
      let cashbackRate: number | null = null;
      let rewardsPointsRatio: number | null = null;

      if (mainRate.trim().length > 0) {
        const numeric = Number(mainRate.replace(",", "."));
        if (!Number.isNaN(numeric)) {
          if (rewardType === "Cashback") {
            cashbackRate = numeric / 100; // "1" => 1% => 0.01
          } else if (rewardType === "Points") {
            rewardsPointsRatio = numeric; // "4" => 4x points
          }
        }
      }

      const created = await createCard(userId, {
        name: cardName,
        bank,
        network: network.toUpperCase(), // VISA / MASTERCARD / AMEX pour coller au backend
        cashbackRate,
        rewardsPointsRatio,
      });

      // ajouter la carte dans la liste localement
      setCards((prev) => [...prev, created]);

      // reset du formulaire (sauf rewardType)
      setCardName("");
      setBank("");
      setMainRate("");
    } catch (e: any) {
      setError(e.message ?? "Erreur lors de l'ajout de la carte");
    } finally {
      setSavingCard(false);
    }
  }

  return (
    <AppLayout>
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

      {/* LISTE DES CARTES (dynamique) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
        <h2 className="text-base font-semibold mb-3">Cartes enregistrées</h2>

        {loading && (
          <p className="text-sm text-slate-400">Chargement des cartes…</p>
        )}

        {error && (
          <p className="text-sm text-rose-300">
            Erreur : {error}
          </p>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {cards.length > 0 ? (
              cards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-3"
                >
                  <div>
                    <div className="font-medium text-slate-100">
                      {card.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      Banque : {card.bank} • Réseau : {card.network} •{" "}
                      {card.cashbackRate != null
                        ? `Cashback ${(card.cashbackRate * 100).toFixed(1)}%`
                        : "Cashback N/A"}
                      {card.rewardsPointsRatio != null &&
                        ` • ${card.rewardsPointsRatio.toFixed(1)}x points`}
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
              ))
            ) : (
              <p className="text-sm text-slate-400">
                Aucune carte enregistrée pour le moment.
              </p>
            )}
          </div>
        )}
      </section>

      {/* FORMULAIRE AJOUT / MODIF */}
      <section
        id="add-card"
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm"
      >
        <h2 className="text-base font-semibold mb-3">
          Ajouter une nouvelle carte
        </h2>
        <form className="space-y-4" onSubmit={handleCreateCard}>
          <div>
            <label className="block text-slate-400 mb-1">
              Nom de la carte
            </label>
            <input
              type="text"
              placeholder="Ex. Visa Infinite TD"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 mb-1">Banque</label>
              <input
                type="text"
                placeholder="Ex. TD, Desjardins…"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Réseau</label>
              <select
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                value={network}
                onChange={(e) =>
                  setNetwork(e.target.value as "Visa" | "Mastercard" | "Amex")
                }
              >
                <option>Visa</option>
                <option>Mastercard</option>
                <option>Amex</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">
                Type de récompense
              </label>
              <select
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                value={rewardType}
                onChange={(e) => setRewardType(e.target.value as RewardType)}
              >
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
              placeholder={
                rewardType === "Cashback"
                  ? "Ex. 1 (pour 1% cashback)"
                  : rewardType === "Points"
                  ? "Ex. 4 (pour 4x points)"
                  : "Ex. 1"
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              value={mainRate}
              onChange={(e) => setMainRate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800"
              onClick={() => {
                setCardName("");
                setBank("");
                setMainRate("");
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={savingCard}
              className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300 disabled:opacity-60"
            >
              {savingCard ? "Enregistrement..." : "Enregistrer la carte"}
            </button>
          </div>
        </form>
      </section>
    </AppLayout>
  );
}
