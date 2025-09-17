import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define Recent Transactions
interface TransactionsType {
  // will add date in the future
  bank: string;
  amount: number;
  typeOfTransfer: string;
  cardNo: string;
  date: string;
}

interface TransactionsState {
  recentTransaction: TransactionsType[];
}


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

export const{addRecentTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;