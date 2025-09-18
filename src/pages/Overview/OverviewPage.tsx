import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transactionForm/TransactionForm";
import RecentTransactions from "../../components/recentTransactions/RecentTransactions";
import { TransactionDetails } from "../../components/transactionDetails/TransactionDetails";
import type { TransactionsType } from "../../store/transaction";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | "details" | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsType | null>(null);
  function closeModal() {
    setModalOpenType(null);
  }

  function openDetailsModal(transaction: TransactionsType) {
    setModalOpenType("details");
    setSelectedTransaction(transaction);
  }

  return (
    <div className={styles.container}>
      <Header title="Overview" />
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
          <RecentTransactions viewDetailsOnClick={openDetailsModal} />
        </div>
        <div className={styles.rightBox}>
        </div>
      </div>
      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {(modalOpenType==="income" || modalOpenType==="expense") && <TransactionForm type={modalOpenType} closeForm={closeModal} />}
        {modalOpenType==="details" && selectedTransaction &&
          <TransactionDetails
            bank={selectedTransaction.bank}
            amount={selectedTransaction.amount}
            typeOfTransfer={selectedTransaction.typeOfTransfer}
            category={selectedTransaction.category}
            date={selectedTransaction.date}
            cardNo={selectedTransaction.cardNo}
            comments={selectedTransaction.comments}
          />
        }
      </Modal>
    </div>
  );
}

export default Overview;