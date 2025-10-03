import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../util/transactionTypes';
import { generateTransactionID } from '../util/genID';

// Define Recent Transactions
interface TransactionsType {
  id: string;
  bank: string;
  amount: number;
  typeOfTransfer: "income" | "expense";
  category: Category;
  comments: string;
  cardNo: string;
  date: string;
}

// Utility type to exclude the id field
type AddTransactionPayload<T> = Omit<T, 'id'>;

interface TransactionsState {
  recentTransaction: TransactionsType[];
}

const dummyState: TransactionsState = {
  recentTransaction: [
    {
      id: "TSCN1",
      bank: "Maybank",
      amount: 200,
      typeOfTransfer: "income",
      category: "Salary/Wages",
      comments: "test 1",
      cardNo: "1234567890123456",
      date: "2025-09-01",
    },
    {
      id: "TSCN2",
      bank: "CIMB",
      amount: 50,
      typeOfTransfer: "expense",
      category: "Food & Dining",
      comments: "test 2",
      cardNo: "6543217890123456",
      date: "2025-09-02",
    },
    {
      id: "TSCN3",
      bank: "Maybank",
      amount: 100,
      typeOfTransfer: "expense",
      category: "Transportation",
      comments: "test 3",
      cardNo: "1234567890123456",
      date: "2025-09-03",
    },
    {
      id: "TSCN4",
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
  initialState: dummyState,
  reducers: {
    // adding to recent transactions 
    addRecentTransaction(state, action: PayloadAction<AddTransactionPayload<TransactionsType>>) {
      const newTransaction = { id: generateTransactionID(), ...action.payload };
      state.recentTransaction.splice(0, 0, newTransaction);
    }
  },
});

export type { TransactionsType };
export const{addRecentTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;