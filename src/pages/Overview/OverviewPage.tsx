import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transactionForm/transactionForm";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";

import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | null>(null);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.balances}>
        <CashBalance title="My Balance" balance={true}>
          <div className={styles.balanceActions}>
            <Button className={styles.buttons} onClick={() => setModalOpenType("expense")}>
              Transfer
            </Button>
            <Button className={styles.buttons} onClick={() => setModalOpenType("income")}>
              Received
            </Button>
          </div>
        </CashBalance>
        <CashBalance title="Monthly Income" income={true}/>
        <CashBalance title="Monthly Expenses" expense={true}/>
      </div>

      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {modalOpenType && <TransactionForm type={modalOpenType}/>}
      </Modal>
    </div>
  );
}

export default Overview;