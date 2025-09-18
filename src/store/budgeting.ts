import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Defining the budget amounts
interface budgetState{
  mainAmount:number;
}

const initialState: budgetState = {
  mainAmount: 0
}

const budgetSlice = createSlice({
  name:'budgetDetails',
  initialState:initialState,
  reducers:{
    // add to the expenses
    setBudget(state,action:PayloadAction<number>){
      state.mainAmount = action.payload
    },
  },
});

export const{setBudget}= budgetSlice.actions;
export default budgetSlice.reducer;