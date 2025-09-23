import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateBudgetID } from "../util/genID";
import type { Category } from "../util/transactionCategories";

// Defining the budget amounts
interface budgetObject {
  id: string;
  title: string;
  categoryAndAmount: { category: Category; amount: number }[] | null;
}

type PayloadActionWithoutId = Omit<budgetObject, 'id'>;

interface budgetState {
  budgets: budgetObject[];
}

const initialState: budgetState = {
  budgets: [],
};

const dummyState: budgetState = {
  budgets: [
    {
      id: "BDGT1",
      title: "My first Budget",
      categoryAndAmount: [
        { category: "Food & Dining", amount: 200 },
        { category: "Transportation", amount: 100 },
      ]
    },
    {
      id: "BDGT2",
      title: "My second Budget",
      categoryAndAmount: [
        { category: "Shopping", amount: 300 },
        { category: "Entertainment", amount: 150 },
      ]
    }
  ]
}

const budgetSlice = createSlice({
  name: 'budgetDetails',
  initialState: dummyState,
  reducers: {
    // add to the expenses
    addBudget(state, action: PayloadAction<PayloadActionWithoutId>) {
      const newBudgetItem: budgetObject = {id: generateBudgetID(), ...action.payload};
      state.budgets.push(newBudgetItem);
    },
    editBudget(state, action: PayloadAction<budgetObject>){
      state.budgets = state.budgets.map(budget => 
        budget.id === action.payload.id ? action.payload : budget
      );
    },
    deleteBudget(state, action: PayloadAction<string>){
      state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
    }
  },
});

export type { budgetObject };
export const { addBudget, editBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;