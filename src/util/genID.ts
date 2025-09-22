let transactionIDCounter = 0;
let assetLiabilityIDCounter = 4;

export function generateTransactionID(): string {
  transactionIDCounter += 1;
  return `TSCN${transactionIDCounter}`;
}

export function generateAssetLiabilityID(): string {
  assetLiabilityIDCounter += 1;
  return `ASLI${assetLiabilityIDCounter}`;
}

