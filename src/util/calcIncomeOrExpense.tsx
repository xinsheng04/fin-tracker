import type { TransactionObject } from "./transactionTypes";
const calcIncomeOrExpense = (transactions: TransactionObject[], type: "income" | "expense") => {
  const total = transactions.reduce((acc: number, transaction: TransactionObject) => {
    if (transaction.typeOfTransfer === type) {
      return acc + Number(transaction.amountTransfered);
    }
    return acc;
  }, 0);
  return total;
}

export default calcIncomeOrExpense;