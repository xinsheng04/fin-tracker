import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transaction/transactionForm/TransactionForm";
import RecentTransactions from "../../components/transaction/recentTransactions/RecentTransactions";
import TransactionDetails from "../../components/transaction/transactionDetails/TransactionDetails";
import AssetLiabilityForm from "../../components/assetLiability/assetLiabilityForm/AssetLiabilityForm";
import AssetLiabilityList from "../../components/assetLiability/assetLiabilityList/AssetLiabilityList";
import AssetLiabilityDetail from "../../components/assetLiability/assetLiabilityDetail/AssetLiabilityDetail";

import type { TransactionObject } from "../../util/transactionTypes";
import type { AssetLiabilityObject } from "../../util/assetLiabilityTypes";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | "asset-liability" | "details-transactions" | "details-assets-liabilities" | null>(null);
  const [selected, setSelected] = useState<TransactionObject | AssetLiabilityObject | null>(null);
  function closeModal() {
    setModalOpenType(null);
  }

  function openTransactionDetailsModal(transactionData: TransactionObject) {
    setModalOpenType("details-transactions");
    setSelected(transactionData);
  }

  function openAssetLiabilityDetailsModal(assetLiabilityData: AssetLiabilityObject) {
    setModalOpenType("details-assets-liabilities");
    setSelected(assetLiabilityData);
  }

  function isTransactionObject(data: any): data is TransactionObject {
    return (data as TransactionObject)?.transactionId !== undefined;
  }

  function isAssetLiabilityObject(data: any): data is AssetLiabilityObject {
    return (data as AssetLiabilityObject)?.AsLiId !== undefined;
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
          <RecentTransactions viewDetailsOnClick={openTransactionDetailsModal} />
        </div>
        <div className={styles.rightBox}>
          <AssetLiabilityList viewDetailsOnClick={openAssetLiabilityDetailsModal} />
        </div>
      </div>
      <Modal isOpen={modalOpenType !== null} onClose={closeModal}>
        {(modalOpenType==="income" || modalOpenType==="expense") && 
        <TransactionForm type={modalOpenType} closeForm={closeModal} />}
        {modalOpenType==="asset-liability" && 
        <AssetLiabilityForm closeForm={closeModal} />}

        {isTransactionObject(selected) && selected !== null &&
          <TransactionDetails transactionData={selected} />
        }
        {isAssetLiabilityObject(selected) && selected !== null &&
          <AssetLiabilityDetail
            assetLiabilityData={selected}
            onClose={closeModal}
          />
        }
      </Modal>
    </div>
  );
}

export default Overview;