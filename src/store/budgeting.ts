import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Defining the budget amounts
interface budgetState {
  mainAmount: number|null;
  remainAmount: number |null;
}

const initialState: budgetState = {
  mainAmount : null,
  remainAmount : null
}

const budgetSlice = createSlice({
  name: 'budgetDetails',
  initialState: initialState,
  reducers: {
    // add to the expenses
    setBudget(state, action: PayloadAction<number>) {
      state.mainAmount = action.payload;
      // remainAmount initialize should be equal to mainAmount
      state.remainAmount = action.payload;
    },
    
    deductFromRemaining ( state,action:PayloadAction<number>){
      if(state.remainAmount !==null){ 
        state.remainAmount = state.remainAmount - action.payload;
      }
    }
  },
});

export const { setBudget, deductFromRemaining } = budgetSlice.actions;
export default budgetSlice.reducer;