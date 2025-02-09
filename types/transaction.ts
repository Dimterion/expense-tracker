export interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: string;
  createdAt: Date;
}

export interface TransactionData {
  text: string;
  amount: number;
}

export interface TransactionResult {
  data?: TransactionData;
  error?: string;
}
