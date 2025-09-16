import styles from './transactionCard.module.css';

interface TransactionCardProps {
  bank: string;
  cardNo: string;
  typeOfTransfer: string;
  amount: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ bank, cardNo, typeOfTransfer, amount }) => {
  return (
    <div key={cardNo} className={styles.transactionItem}>
      <div className={styles.origin}>
        <strong>{bank}</strong>
        <p className={styles.cardNumber}>{cardNo}</p>
      </div>
      <div className={typeOfTransfer==="income" ? `${styles.income}` : `${styles.expense}`}>{typeOfTransfer==="income" ? `+${amount}` : `-${amount}`}</div>
    </div>
  )
};

export default TransactionCard;