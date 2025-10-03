interface AssetLiabilityObject {
  AsLiId: string;
  title: string;
  value: number;
  description: string;
  acquireDate: string;
  type: "asset" | "liability";
  category: "current" | "fixed";
}

export type { AssetLiabilityObject };
// 
