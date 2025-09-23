// start from last ID in the dummy data or 0 if no dummy data
let transactionIDCounter = 4;
let assetLiabilityIDCounter = 5;
let budgetIDCounter = 2;

export function generateTransactionID(): string {
  transactionIDCounter += 1;
  return `TSCN${transactionIDCounter}`;
}

export function generateAssetLiabilityID(): string {
  assetLiabilityIDCounter += 1;
  return `ASLI${assetLiabilityIDCounter}`;
}

export function generateBudgetID(): string {
  budgetIDCounter += 1;
  return `BDGT${budgetIDCounter}`;
}

