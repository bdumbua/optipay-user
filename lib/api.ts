// lib/api.ts
import type { Card, Transaction } from "@/types/domain";

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
  return res.json();
}

// Récupérer les cartes d'un utilisateur
export async function fetchCards(userId: number): Promise<Card[]> {
  // adapte le chemin si ton controller expose autre chose
  return apiFetch(`/api/cards?userId=${userId}`);
}

// Récupérer les transactions d'un utilisateur
export async function fetchTransactions(
  userId: number
): Promise<Transaction[]> {
  // adapte le chemin si ton controller expose autre chose
  return apiFetch(`/api/transactions?userId=${userId}`);
}

export async function recommendCard(payload: {
  userId: number;
  amountCad: number;
  mcc: string;
  country: string;
  channel: "ONLINE" | "IN_STORE";
}): Promise<{
  recommendedCardId: number;
  reason: string;
  score?: number;
  alternatives?: { cardId: number; score: number }[];
}> {
  return apiFetch(`/api/recommendations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
