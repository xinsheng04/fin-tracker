import styles from './transactionCard.module.css';
import { useSelector } from 'react-redux';

interface TransactionCardProps {
  id: string;
  viewDetailsOnClick: (openType: string, id: string) => void;
}
// used in overview.tsx ONLy (for now)
const TransactionCard: React.FC<TransactionCardProps> = ({ id, viewDetailsOnClick }) => {
  const { bank, cardNo, typeOfTransfer, amount, date } = useSelector((state: any) => state.transaction.recentTransaction)
  .find((tr: any) => tr.id === id);
  return (
    <div className={styles.main}>
      <div key={cardNo} className={styles.transactionItem} onClick={() => viewDetailsOnClick("details-transactions", id)}>
        <div className={styles.origin}>
          <strong>{bank}</strong>
          <p className={styles.cardNumber}>{cardNo}</p>
        </div>
        <p className={styles.date}>{date}</p>
        <div className={typeOfTransfer==="income" ? `${styles.income}` : `${styles.expense}`}>{typeOfTransfer==="income" ? `+${amount}` : `-${amount}`}</div>
      </div>
    </div>
  )
};

export default TransactionCard;