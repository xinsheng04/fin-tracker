import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { generateAssetLiabilityID } from "../util/genID";

interface AssetLiabilityKeyValue {
  id: string;
  item: string;
  value: number;
  description: string;
  date: string;
  type: "asset" | "liability";
  category: "current" | "fixed";
}

type AssetLiabilityValue = Omit<AssetLiabilityKeyValue, 'id'>;

interface AssetLiabilityType {
  assetLiabilityItems: AssetLiabilityKeyValue[];
}

const dummyState: AssetLiabilityType = {
  assetLiabilityItems: [
    {
      id: "ASLI1",
      item: "Cash",
      value: 5000,
      description: "Cash in hand",
      date: "2025-09-01",
      type: "asset",
      category: "current",
    },
    {
      id: "ASLI2",
      item: "Car Loan",
      value: 15000,
      description: "Loan for car purchase",
      date: "2025-08-15",
      type: "liability",
      category: "fixed",
    },
    {
      id: "ASLI3",
      item: "Savings Account",
      value: 20000,
      description: "Bank savings",
      date: "2025-09-10",
      type: "asset",
      category: "current",
    },
    {
      id: "ASLI4",
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

const assetLiabilitySlice = createSlice({
  name: 'assetLiability',
  initialState: dummyState,
  reducers: {
    // pass the entire new item without id
    addItem(state, action: PayloadAction<AssetLiabilityValue>) {
      const newItem = { id: generateAssetLiabilityID(), ...action.payload };
      state.assetLiabilityItems.push(newItem);
    },
    // pass the id
    removeItem(state, action: PayloadAction<{ id: string }>) {
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