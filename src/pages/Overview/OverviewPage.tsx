import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transactionForm/TransactionForm";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import { useSelector } from "react-redux";
import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | null>(null);
  function closeModal() {
    setModalOpenType(null);
  }
  // going to output the recentTransaction arrays 
  const recent = useSelector((state:any)=>state.myWallet.recentTransaction)
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
        <CashBalance title="Monthly Income" income={true} />
        <CashBalance title="Monthly Expenses" expense={true} />

      </div>
      <div className={styles.recentTransactions}>
        <div>
          <h3>Recent transactions</h3>
          {recent.map((rec:any)=>{
            return (
              <ul key={rec.cardNo}>
                <li>bank:{rec.bank}</li>
                <li>card Number:{rec.cardNo}</li>
                <li>type : {rec.typeOfTransfer}</li>
                <li>amount:{rec.amount}</li>
              </ul>
            )
          })}
        </div>
        <div>see now its aligned</div>

      </div>


      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {modalOpenType && <TransactionForm type={modalOpenType} closeForm={closeModal} />}
      </Modal>
    </div>
  );
}

export default Overview;