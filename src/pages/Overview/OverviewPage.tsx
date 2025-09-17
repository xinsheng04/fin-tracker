import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transactionForm/TransactionForm";
import TransactionCard from "../../components/transactionCard/TransactionCard";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import { useSelector } from "react-redux";
import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | null>(null);
  const [transactionDisplayType, setTransactionDisplayType] = useState<"all" | "income" | "expense">("all");
  function closeModal() {
    setModalOpenType(null);
  }
  // going to output the recentTransaction arrays 
  const recent = useSelector((state: any) => state.myWallet.recentTransaction)
  const incomeExists = recent.some((rec: any) => rec.typeOfTransfer === "income");
  const expenseExists = recent.some((rec: any) => rec.typeOfTransfer === "expense");

  let shouldRender = recent.length > 0 && 
    (transactionDisplayType === "all" || 
    (transactionDisplayType === "income" && incomeExists) || 
    (transactionDisplayType === "expense" && expenseExists));

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.balances}>
        <CashBalance className={styles.balanceBox} title="My Balance" balance={true}>
          <div className={styles.balanceActions}>
            <Button className={styles.buttons} onClick={() => setModalOpenType("expense")}>
              Outgoing
            </Button>
            <Button className={styles.buttons} onClick={() => setModalOpenType("income")}>
              Received
            </Button>
          </div>
        </CashBalance>
        <CashBalance className={styles.balanceBox} title="Monthly Income" income={true} />
        <CashBalance className={styles.balanceBox} title="Monthly Expenses" expense={true} />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.leftBox}>
          {/* This thing could consider putting into its own component */}
          {/* But I'm lazy */}
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
            {!shouldRender && transactionDisplayType === "all" && <p className={styles.noRecents}>No recent transactions</p>}
            {!shouldRender && transactionDisplayType === "income" && <p className={styles.noRecents}>No income transactions</p>}
            {!shouldRender && transactionDisplayType === "expense" && <p className={styles.noRecents}>No expense transactions</p>}
            {/* honestly could consider refactoring this into a table */}
              {
              shouldRender &&
               recent.map((rec: any, index: number) => {
                if(transactionDisplayType === "all" || transactionDisplayType === rec.typeOfTransfer){
                  return (
                    <TransactionCard
                      key={rec.cardNo + index}
                      bank={rec.bank}
                      cardNo={rec.cardNo}
                      typeOfTransfer={rec.typeOfTransfer}
                      amount={rec.amount}
                    />
                  )
                } else
                  return null;
              })}
          </div>
        </div>
        <div className={styles.rightBox}>
        </div>
      </div>
      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {modalOpenType && <TransactionForm type={modalOpenType} closeForm={closeModal} />}
      </Modal>
    </div>
  );
}

export default Overview;