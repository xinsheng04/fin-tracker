import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AssetLiabilityKeyValue {
  id: number;
  item: string;
  value: number;
  description: string;
  date: string;
  type: "asset" | "liability";
  category: "current" | "fixed";
}

interface AssetLiabilityType {
  assetLiabilityItems: AssetLiabilityKeyValue[];
}

const dummyState: AssetLiabilityType = {
  assetLiabilityItems: [
    {
      id: 1,
      item: "Cash",
      value: 5000,
      description: "Cash in hand",
      date: "2025-09-01",
      type: "asset",
      category: "current",
    },
    {
      id: 2,
      item: "Car Loan",
      value: 15000,
      description: "Loan for car purchase",
      date: "2025-08-15",
      type: "liability",
      category: "fixed",
    },
    {
      id: 3,
      item: "Savings Account",
      value: 20000,
      description: "Bank savings",
      date: "2025-09-10",
      type: "asset",
      category: "current",
    },
    {
      id: 4,
      item: "Mortgage",
      value: 100000,
      description: "Home mortgage",
      date: "2025-07-20",
      type: "liability",
      category: "fixed",
    },
  ],
};

const initialState: AssetLiabilityType = {
  assetLiabilityItems: [],
}

function generateNextID(): number {
  return Math.max(0, ...initialState.assetLiabilityItems.map(item => item.id)) + 1;
}

const assetLiabilitySlice = createSlice({
  name: 'assetLiability',
  initialState: dummyState,
  reducers: {
    // pass the entire new item without id
    addItem(state, action: PayloadAction<AssetLiabilityKeyValue>) {
      const newItem = { ...action.payload, id: generateNextID() };
      state.assetLiabilityItems.push(newItem);
    },
    // pass the id
    removeItem(state, action: PayloadAction<{ id: number }>) {
      const { id } = action.payload;
      state.assetLiabilityItems = state.assetLiabilityItems.filter(i => i.id !== id);
    },
    // pass the entire new updated item
    updateItem(state, action: PayloadAction<AssetLiabilityKeyValue>) {
      const updatedItem = action.payload;
      const index = state.assetLiabilityItems.findIndex(i => i.id === updatedItem.id);
      if (index !== -1) {
        state.assetLiabilityItems[index] = updatedItem;
      }
    }
  }
});

export type { AssetLiabilityKeyValue as AssetLiabilityKeyValueType };
export const { addItem, removeItem, updateItem } = assetLiabilitySlice.actions;
export default assetLiabilitySlice.reducer;