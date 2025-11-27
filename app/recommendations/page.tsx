"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import { recommendCard } from "@/lib/api";
import AppSidebar from "../components/AppSidebar";

type RecommendationResult = {
  recommendedCardId: number;
  reason: string;
  score?: number;
  alternatives?: { cardId: number; score: number }[];
};

export default function RecommendationsPage() {
  const [amount, setAmount] = useState<number>(50);
  const [mcc, setMcc] = useState<string>("5411"); // épicerie
  const [country, setCountry] = useState<string>("CA");
  const [channel, setChannel] = useState<"ONLINE" | "IN_STORE">("IN_STORE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const userId = 1; // MVP : en dur, plus tard -> depuis l'auth

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const reco = await recommendCard({
        userId,
        amountCad: amount,
        mcc,
        country,
        channel,
      });
      setResult(reco);
    } catch (e: any) {
      setError(e.message ?? "Erreur lors du calcul de la recommandation.");
    } finally {
      setLoading(false);
    }
  }

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
          <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">
                Recommandation de carte
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Simulez un paiement, OptiPay vous suggère la meilleure carte à
                utiliser.
              </p>
            </div>
          </section>

          {/* ZONE PRINCIPALE : FORMULAIRE + RÉSULTAT */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* FORMULAIRE */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
              <h2 className="text-base font-semibold mb-3">
                Détails de la transaction
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-slate-400 mb-1">
                    Montant (CAD)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Type d&apos;achat
                    </label>
                    <select
                      value={mcc}
                      onChange={(e) => setMcc(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                    >
                      <option value="5411">Épicerie / Supermarché (MCC 5411)</option>
                      <option value="5812">Restaurant (MCC 5812)</option>
                      <option value="5732">Électronique (MCC 5732)</option>
                      <option value="5541">Station-service (MCC 5541)</option>
                      <option value="5311">Magasin général (MCC 5311)</option>
                      <option value="0">Autre / Divers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Pays</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                    >
                      <option value="CA">Canada</option>
                      <option value="US">États-Unis</option>
                      <option value="FR">France</option>
                      <option value="SN">Sénégal</option>
                      <option value="OTHER">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">
                    Canal de paiement
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setChannel("IN_STORE")}
                      className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                        channel === "IN_STORE"
                          ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                          : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-900"
                      }`}
                    >
                      En magasin
                    </button>
                    <button
                      type="button"
                      onClick={() => setChannel("ONLINE")}
                      className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                        channel === "ONLINE"
                          ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                          : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-900"
                      }`}
                    >
                      En ligne
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-300 bg-rose-950/40 border border-rose-900/50 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border border-slate-700 text-sm hover:bg-slate-800"
                    onClick={() => {
                      setResult(null);
                      setError(null);
                    }}
                  >
                    Réinitialiser
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Calcul en cours..." : "Recommander une carte"}
                  </button>
                </div>
              </form>
            </div>

            {/* RÉSULTAT */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm flex flex-col gap-3">
              <h2 className="text-base font-semibold">Carte recommandée</h2>
              {!result && !loading && !error && (
                <p className="text-sm text-slate-400">
                  Remplissez les détails de votre transaction à gauche, puis
                  cliquez sur <span className="font-medium">“Recommander une carte”</span> pour voir la
                  suggestion d&apos;OptiPay.
                </p>
              )}

              {result && (
                <>
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase text-emerald-300">
                        Carte recommandée
                      </div>
                      {result.score != null && (
                        <div className="text-[11px] text-emerald-200">
                          Score : {(result.score * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                    <div className="text-lg font-semibold text-slate-50">
                      Carte #{result.recommendedCardId}
                    </div>
                    <p className="text-xs text-emerald-100/80">
                      {result.reason}
                    </p>
                  </div>

                  {result.alternatives && result.alternatives.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-xs font-semibold text-slate-400 mb-1">
                        Alternatives possibles
                      </h3>
                      <div className="space-y-1">
                        {result.alternatives.map((alt) => (
                          <div
                            key={alt.cardId}
                            className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-1.5 bg-slate-950/40 text-xs"
                          >
                            <span>Carte #{alt.cardId}</span>
                            <span className="text-slate-300">
                              Score {(alt.score * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* SECTION HISTORIQUE (mock pour l'instant) */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold">
                Dernières simulations de recommandations
              </h2>
              <span className="text-xs text-slate-500">
                Historique local (démo)
              </span>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/40">
                <div>
                  <div className="font-medium text-slate-100">
                    85,00 $ • Épicerie (MCC 5411, CA)
                  </div>
                  <div className="text-xs text-slate-400">
                    Recommandée : Carte #1 • En magasin
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
                  Cashback optimisé
                </span>
              </li>
              <li className="flex items-center justify-between border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/40">
                <div>
                  <div className="font-medium text-slate-100">
                    42,90 $ • Restaurant (MCC 5812, CA)
                  </div>
                  <div className="text-xs text-slate-400">
                    Recommandée : Carte #2 • En ligne
                  </div>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300">
                  Points maximisés
                </span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
