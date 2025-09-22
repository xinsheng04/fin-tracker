import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transactionForm/TransactionForm";
import RecentTransactions from "../../components/recentTransactions/RecentTransactions";
import TransactionDetails from "../../components/transactionDetails/TransactionDetails";
import AssetLiabilityForm from "../../components/assetLiabilityForm/AssetLiabilityForm";
import AssetLiabilityList from "../../components/assetLiabilityList/AssetLiabilityList";
import AssetLiabilityDetail from "../../components/assetLiabilityDetail/AssetLiabilityDetail";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | "asset-liability" | "details-transactions" | "details-assets-liabilities" | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  function closeModal() {
    setModalOpenType(null);
  }

  function openDetailsModal(openType: string, id: string){
    setModalOpenType(openType as "details-transactions" | "details-assets-liabilities");
    setSelected(id);
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
          <p className={styles.asLi}>Or, you can&nbsp;
            <span onClick={() => setModalOpenType("asset-liability")}>
              add a new asset or liability
            </span>
          </p>
        </CashBalance>
        <CashBalance className={styles.balanceBox} title="Monthly Income" income={true} />
        <CashBalance className={styles.balanceBox} title="Monthly Expenses" expense={true} />
      </div>
      <div className={styles.contentBox}>
        <div className={styles.leftBox}>
          <RecentTransactions viewDetailsOnClick={openDetailsModal} />
        </div>
        <div className={styles.rightBox}>
          <AssetLiabilityList viewDetailsOnClick={openDetailsModal} />
        </div>
      </div>
      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {(modalOpenType==="income" || modalOpenType==="expense") && 
        <TransactionForm type={modalOpenType} closeForm={closeModal} />}
        {modalOpenType==="asset-liability" && 
        <AssetLiabilityForm closeForm={closeModal} />}
        {modalOpenType==="details-transactions" && selected &&
          <TransactionDetails
            id={selected}
          />
        }
        {modalOpenType==="details-assets-liabilities" && selected &&
          <AssetLiabilityDetail
            id={selected}
            onClose={closeModal}
          />
        }
      </Modal>
    </div>
  );
}

export default Overview;