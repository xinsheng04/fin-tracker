import type { TransactionsType } from "../store/transaction";
const calcIncomeOrExpense = (transactions: TransactionsType[], type: "income" | "expense") => {
  const total = transactions.reduce((acc: number, transaction: TransactionsType) => {
    if (transaction.typeOfTransfer === type) {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
  return total;
}

export default calcIncomeOrExpense;