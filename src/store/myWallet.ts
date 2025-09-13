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
  bankAccounts: Card[]
}

// initial State 
const initialState : Wallet = { 
  bankAccounts:[],
}

// creating the slice 
const myWalletSlice = createSlice({
  name:'myWalletDetails',
  initialState,
  reducers: {
    // Adding a card to the store 
    addAmountToCard(state,action:PayloadAction<{cardNo:string; amount:number}>){ 
      const {cardNo, amount}= action.payload;
      const card = state.bankAccounts.find((c)=> c.cardNo === cardNo)
        if(card){
          card.amount+=amount
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
    }
      
  },
});

export const{addAmountToCard,addNewCard,deleteCard} = myWalletSlice.actions;
export default myWalletSlice.reducer;