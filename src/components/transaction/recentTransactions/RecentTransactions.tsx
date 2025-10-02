import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetAllTransactions } from "../../../api/transactionAPI";

import TransactionCard from "../transactionCard/TransactionCard";
import styles from "./RecentTransactions.module.css"

type RecentTransactionsProps = {
  viewDetailsOnClick: (openType: string, id: string) => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ viewDetailsOnClick }) => {
  const [transactionDisplayType, setTransactionDisplayType] = useState<"all" | "income" | "expense">("all");
  // going to output the recentTransaction arrays 
  const email = useSelector((state: any) => state.userInfo.email);
  const { data: recent, isLoading, isError, error } = useGetAllTransactions(email);

  const incomeExists = recent?.some((rec: any) => rec.typeOfTransfer === "income");
  const expenseExists = recent?.some((rec: any) => rec.typeOfTransfer === "expense");

  let shouldRender = !isLoading && !isError && recent?.length > 0 &&
    (transactionDisplayType === "all" ||
      (transactionDisplayType === "income" && incomeExists) ||
      (transactionDisplayType === "expense" && expenseExists));
    
  if(isError){
    return(
    <div className={styles.recentTransactions}>
      <h3>Recent transactions</h3>
      <p className={styles.error}>{(error as Error).message}</p>
    </div>
    );
  }

  return (
    <div className={styles.recentTransactions}>
      <h3>Recent transactions</h3>
      <ul className={styles.transactionTypes}>
        <li
          className={transactionDisplayType === "all" ? styles.active : ""}
          onClick={() => setTransactionDisplayType("all")}>
          <p>All</p>
        </li>
        <li
          className={transactionDisplayType === "income" ? styles.active : ""}
          onClick={() => setTransactionDisplayType("income")}>
          <p>Income</p>
        </li>
        <li
          className={transactionDisplayType === "expense" ? styles.active : ""}
          onClick={() => setTransactionDisplayType("expense")}>
          <p>Expenses</p>
        </li>
      </ul>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {!shouldRender && transactionDisplayType === "all" && <p className={styles.noRecents}>No recent transactions</p>}
      {!shouldRender && transactionDisplayType === "income" && <p className={styles.noRecents}>No income transactions</p>}
      {!shouldRender && transactionDisplayType === "expense" && <p className={styles.noRecents}>No expense transactions</p>}
      {/* honestly could consider refactoring this into a table */}
      <div className={styles.transactionList}>
        {
          shouldRender &&
          recent.map((rec: any) => {
            if (transactionDisplayType === "all" || transactionDisplayType === rec.typeOfTransfer) {
              return (
                <TransactionCard
                  viewDetailsOnClick={viewDetailsOnClick}
                  key={rec.id}
                  id={rec.id}
                />
              )
            } else
              return null;
          })}
      </div>
    </div>
  );
}

export default RecentTransactions;