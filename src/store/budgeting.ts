import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateBudgetID } from "../util/genID";
import type { Category } from "../util/transactionCategories";

// Defining the budget amounts
interface budgetObject {
  id: string;
  title: string;
  trackDateFrom: string;
  categoryAndAmount: { category: Category; amount: number }[] | null;
}

type PayloadActionWithoutId = Omit<budgetObject, 'id' | 'trackDateFrom'>;

type ResetBudgetProgressObject = {
  budgetId: string;
  newTrackDateFrom: string;
}

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
      trackDateFrom: "2023-01-01",
      categoryAndAmount: [
        { category: "Food & Dining", amount: 200 },
        { category: "Transportation", amount: 100 },
      ]
    },
    {
      id: "BDGT2",
      title: "My second Budget",
      trackDateFrom: "2023-02-01",
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
      // Initial date is this month's first date
      const todayDate = new Date().toISOString().split('T')[0];
      const date = new Date(todayDate);
      date.setDate(1);
      const firstDay = date.toISOString().split('T')[0];
      const newBudgetItem: budgetObject = { id: generateBudgetID(), trackDateFrom: firstDay, ...action.payload };
      state.budgets.push(newBudgetItem);
    },
    editBudget(state, action: PayloadAction<budgetObject>) {
      state.budgets = state.budgets.map(budget =>
        budget.id === action.payload.id ? action.payload : budget
      );
    },
    resetBudgetProgress(state, action: PayloadAction<ResetBudgetProgressObject>) {
      const { budgetId, newTrackDateFrom } = action.payload;
      const budgetIdx = state.budgets.findIndex(b => b.id === budgetId);
      if (budgetIdx !== -1) {
        state.budgets = state.budgets.map(b =>
          b.id === budgetId ? { ...b, trackDateFrom: newTrackDateFrom } : b
        );
      }
    },
    deleteBudget(state, action: PayloadAction<string>) {
      state.budgets = state.budgets.filter(budget => budget.id !== action.payload);
    }
  },
});

export type { budgetObject };
export const { addBudget, editBudget, deleteBudget, resetBudgetProgress } = budgetSlice.actions;
export default budgetSlice.reducer;