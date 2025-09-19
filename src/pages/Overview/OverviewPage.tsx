import { useState } from "react";
import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import TransactionForm from "../../components/transactionForm/TransactionForm";
import RecentTransactions from "../../components/recentTransactions/RecentTransactions";
import TransactionDetails from "../../components/transactionDetails/TransactionDetails";
import type { TransactionsType } from "../../store/transaction";
import AssetLiabilityList from "../../components/assetLiabilityList/AssetLiabilityList";
import AssetLiabilityDetail from "../../components/assetLiabilityDetail/AssetLiabilityDetail";
import type { AssetLiabilityKeyValueType } from "../../store/assetLiability";
import Button from "../../ui/button/Button";
import Modal from "../../ui/modal/Modal";
import styles from "./OverviewPage.module.css";

const Overview: React.FC = () => {
  const [modalOpenType, setModalOpenType] = useState<"income" | "expense" | "details-transactions" | "details-assets-liabilities" | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionsType| null>(null);
  const [selectedAssetLiability, setSelectedAssetLiability] = useState<AssetLiabilityKeyValueType | null>(null);
  function closeModal() {
    setModalOpenType(null);
  }

  function openTransactionDetailsModal(transaction: TransactionsType) {
    setModalOpenType("details-transactions");
    setSelectedTransaction(transaction);
  }

  function openAssetLiabilityDetailsModal(item: AssetLiabilityKeyValueType) {
    setModalOpenType("details-assets-liabilities");
    setSelectedAssetLiability(item);
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
          <RecentTransactions viewDetailsOnClick={openTransactionDetailsModal} />
        </div>
        <div className={styles.rightBox}>
          <AssetLiabilityList viewDetailsOnClick={openAssetLiabilityDetailsModal} />
        </div>
      </div>
      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {(modalOpenType==="income" || modalOpenType==="expense") && <TransactionForm type={modalOpenType} closeForm={closeModal} />}
        {modalOpenType==="details-transactions" && selectedTransaction &&
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
        {modalOpenType==="details-assets-liabilities" && selectedAssetLiability &&
          <AssetLiabilityDetail
            id={selectedAssetLiability.id}
            item={selectedAssetLiability.item}
            value={selectedAssetLiability.value}
            description={selectedAssetLiability.description}
            date={selectedAssetLiability.date}
            type={selectedAssetLiability.type}
            category={selectedAssetLiability.category}
          />
        }
      </Modal>
    </div>
  );
}

export default Overview;