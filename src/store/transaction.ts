import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../util/transactionCategories';

// Define Recent Transactions
interface TransactionsType {
  // will add date in the future
  bank: string;
  amount: number;
  typeOfTransfer: "income" | "expense";
  category: Category;
  comments: string;
  cardNo: string;
  date: string;
}

interface TransactionsState {
  recentTransaction: TransactionsType[];
}

const dummyState: TransactionsState = {
  recentTransaction: [
    {
      bank: "Maybank",
      amount: 200,
      typeOfTransfer: "income",
      category: "Salary/Wages",
      comments: "test 1",
      cardNo: "1234567890123456",
      date: "2025-09-01",
    },
    {
      bank: "CIMB",
      amount: 50,
      typeOfTransfer: "expense",
      category: "Food & Dining",
      comments: "test 2",
      cardNo: "6543217890123456",
      date: "2025-09-02",
    },
    {
      bank: "Maybank",
      amount: 100,
      typeOfTransfer: "expense",
      category: "Transportation",
      comments: "test 3",
      cardNo: "1234567890123456",
      date: "2025-09-03",
    },
    {
      bank: "CIMB",
      amount: 300,
      typeOfTransfer: "income",
      category: "Investments/Dividends",
      comments: "test 4",
      cardNo: "6543217890123456",
      date: "2025-09-04",
    },
  ],
};

const initialState: TransactionsState = {
  recentTransaction: []
};

const transactionSlice = createSlice({
  name: 'recentTransactionDetails',
  initialState: initialState,
  reducers: {
    // adding to recent transactions 
    addRecentTransaction(state, action: PayloadAction<TransactionsType>) {
      state.recentTransaction.splice(0, 0, action.payload);
    }
  },
});

export type { TransactionsType };
export const{addRecentTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;