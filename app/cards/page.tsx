"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { fetchCards } from "@/lib/api";
import type { Card } from "@/types/domain";
import AppSidebar from "../components/AppSidebar";
import AppFooter from "../components/AppFooter";

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // MVP : userId fixé à 1 (toutes tes cartes mockées sont pour userId=1)
  // plus tard -> on utilisera l'ID réel issu de l'auth (Auth0 / JWT)
  const userId = 1;

  useEffect(() => {
    fetchCards(userId)
      .then(setCards)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HEADER */}
      <AppHeader />

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* SIDEBAR */}
       <AppSidebar />

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

          {/* LISTE DES CARTES (dynamique) */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
            <h2 className="text-base font-semibold mb-3">Cartes enregistrées</h2>

            {loading && (
              <p className="text-sm text-slate-400">Chargement des cartes…</p>
            )}

            {error && (
              <p className="text-sm text-rose-300">
                Erreur lors du chargement des cartes : {error}
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
                            ? `Cashback ${(card.cashbackRate * 100).toFixed(
                                1
                              )}%`
                            : "Cashback N/A"}
                          {card.rewardsPointsRatio != null &&
                            ` • ${card.rewardsPointsRatio.toFixed(
                              1
                            )}x points`}
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

          {/* FORMULAIRE AJOUT / MODIF (toujours statique pour l’instant) */}
          <section
            id="add-card"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm"
          >
            <h2 className="text-base font-semibold mb-3">
              Ajouter une nouvelle carte
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">
                  Nom de la carte
                </label>
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
                  <label className="block text-slate-400 mb-1">
                    Type de récompense
                  </label>
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
      <AppFooter />
    </div>
  );
}
