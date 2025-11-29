// lib/api.ts
import type { Card, Transaction, OverviewStats } from "@/types/domain";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  // Pour les DELETE / 204, on ne tente pas de parser du JSON
  if (res.status === 204) {
    return null;
  }

  return res.json();
}

/* ---------- CARTES ---------- */

// Récupérer les cartes d'un utilisateur
// GET /api/cards?userId=1
export async function fetchCards(userId: number): Promise<Card[]> {
  return apiFetch(`/api/cards?userId=${userId}`);
}

export type CreateCardPayload = {
  name: string;
  bank: string;
  network: string;              // "VISA" | "MASTERCARD" | "AMEX"
  cashbackRate?: number | null;
  rewardsPointsRatio?: number | null;
};

// Créer une carte
// POST /api/cards?userId=1
export async function createCard(
  userId: number,
  payload: CreateCardPayload
): Promise<Card> {
  return apiFetch(`/api/cards?userId=${userId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Mettre à jour une carte
// PUT /api/cards/{id}?userId=1
export async function updateCard(
  userId: number,
  cardId: number,
  payload: CreateCardPayload
): Promise<Card> {
  return apiFetch(`/api/cards/${cardId}?userId=${userId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Supprimer une carte
// DELETE /api/cards/{id}?userId=1
export async function deleteCard(
  userId: number,
  cardId: number
): Promise<void> {
  await apiFetch(`/api/cards/${cardId}?userId=${userId}`, {
    method: "DELETE",
  });
}

/* ---------- TRANSACTIONS ---------- */

// Récupérer les transactions d'un utilisateur
// GET /api/transactions?userId=1
export async function fetchTransactions(
  userId: number
): Promise<Transaction[]> {
  return apiFetch(`/api/transactions?userId=${userId}`);
}
// ✅ Payload de création d'une transaction
export type CreateTransactionPayload = {
  userId: number;
  cardId: number | null;
  amountCad: number;
  mcc: string;
  country: string;
  description: string;
  dateTime: string;
};

// ✅ Créer une transaction
// POST /api/transactions
export async function createTransaction(
  payload: CreateTransactionPayload
): Promise<Transaction> {
  return apiFetch(`/api/transactions`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Supprimer une transaction
// DELETE /api/transactions/{id}?userId=1
export async function deleteTransaction(
  userId: number,
  txId: number
): Promise<void> {
  await apiFetch(`/api/transactions/${txId}?userId=${userId}`, {
    method: "DELETE",
  });
}

/* ---------- RECOMMANDATIONS ---------- */

export type RecommendationResult = {
  recommendedCardId: number | null;
  reason: string;
  score?: number | null;
  alternatives?: { cardId: number; score: number }[];
};

// POST /api/recommendations
export async function recommendCard(payload: {
  userId: number;
  amountCad: number;
  mcc: string;
  country: string;
  channel: "ONLINE" | "IN_STORE";
}): Promise<RecommendationResult> {
  return apiFetch("/api/recommendations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Récupérer les stats globales pour un user
export async function fetchOverviewStats(
  userId: number
): Promise<OverviewStats> {
  return apiFetch(`/api/stats/overview?userId=${userId}`);
}