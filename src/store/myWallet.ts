import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// defining the share of the card 
interface Card{ 
  bankName: string
  cardNo : string
  amount: number
}

// Define wallet State 
interface Wallet { 
  bankAccounts: Card[];
  recentTransaction:Transactions[];
}
// Define Recent Transactions
interface Transactions{
  bank:string; 
  amount:number;
  typeOfTransfer:string;
  cardNo:string;
}

// initial State 
const initialState : Wallet = { 
  bankAccounts:[],
  recentTransaction:[]

}

// dummy data
const dummyState: Wallet = {
  bankAccounts: [
    { bankName: "Maybank", cardNo: "1234567890123456", amount: 15000 },
    { bankName: "CIMB", cardNo: "6543217890123456", amount: 5000 },
  ],
  recentTransaction:[]
}

// creating the slice 
const myWalletSlice = createSlice({
  name:'myWalletDetails',
  initialState: initialState,
  reducers: {
    // Adding a card to the store 
    addAmountToCard(state,action:PayloadAction<{cardNo:string; amount:number}>){ 
      const {cardNo, amount}= action.payload;
      const card = state.bankAccounts.find((c)=> c.cardNo === cardNo);
        if(card){
          card.amount+=amount
        }
    },

    removeAmountFromCard(state, action: PayloadAction<{cardNo: string, amount: number}>){
      const {cardNo, amount} = action.payload;
      const card = state.bankAccounts.find((c) => c.cardNo === cardNo);
      if(card && card.amount >= amount){
        card.amount -= amount;
      }
    },

    // adding a new Card 
    addNewCard (state,action:PayloadAction<Card>){
      state.bankAccounts.push(action.payload);
    },
    
    // Removing a Card 
    deleteCard (state,action:PayloadAction<{cardNo:string}>){
      const {cardNo} = action.payload;
      state.bankAccounts= state.bankAccounts.filter(card=> card.cardNo !== cardNo);
    },

    // adding to recent transactions 
    addRecentTransaction(state,action:PayloadAction<Transactions>){
      state.recentTransaction.push(action.payload);
    }
      
  },
});

export const{addAmountToCard,removeAmountFromCard, addNewCard,deleteCard,addRecentTransaction} = myWalletSlice.actions;
export default myWalletSlice.reducer;