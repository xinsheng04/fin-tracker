import styles from './transactionCard.module.css';
import type { TransactionObject } from '../../../util/transactionTypes';

interface TransactionCardProps {
  transactionData: TransactionObject;
  viewDetailsOnClick: (transactionData: TransactionObject) => void;
}

// used in overview.tsx ONLY (for now)
const TransactionCard: React.FC<TransactionCardProps> = ({ transactionData, viewDetailsOnClick }) => {
  const { bankName, cardNo, typeOfTransfer, amountTransfered, dateTransfer } = transactionData;
  return (
    <div className={styles.main}>
      <div key={cardNo} className={styles.transactionItem} onClick={() => viewDetailsOnClick(transactionData)}>
        <div className={styles.origin}>
          <strong>{bankName}</strong>
          <p className={styles.cardNumber}>{cardNo}</p>
        </div>
        <p className={styles.date}>{dateTransfer.split("T")[0]}</p>
        <div className={typeOfTransfer === "income" ? `${styles.income}` : `${styles.expense}`}>{typeOfTransfer === "income" ? `+${amountTransfered}` : `-${amountTransfered}`}</div>
      </div>
    </div>
  )
};

export default TransactionCard;