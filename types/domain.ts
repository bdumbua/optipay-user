// types/domain.ts

export interface Transaction {
  id: number;
  userId: number;
  cardId: number;
  amountCad: number;
  mcc: string;
  country: string;
  description: string;
  /**
   * LocalDateTime côté Java sera sérialisé en string ISO
   * ex: "2025-11-27T18:30:00"
   */
  dateTime: string;
}

// types/domain.ts

export interface Card {
  id: number;
  userId: number; 
  name: string;
  bank: string;
  network: string;            // "VISA", "MC", "AMEX", etc.
  cashbackRate: number;       // 0.02 = 2%
  rewardsPointsRatio: number; // 4.0 = 4x points
  active: boolean;
}
