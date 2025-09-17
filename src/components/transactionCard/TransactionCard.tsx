import styles from './transactionCard.module.css';

interface TransactionCardProps {
  bank: string;
  cardNo: string;
  typeOfTransfer: string;
  amount: number;
  date:string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ bank, cardNo, typeOfTransfer, amount, date }) => {
  return (
    <div key={cardNo} className={styles.transactionItem}>
      <div className={styles.origin}>
        <strong>{bank}</strong>
        <p className={styles.cardNumber}>{cardNo}</p>
      </div>
      <p className={styles.date}>{date}</p>
      <div className={typeOfTransfer==="income" ? `${styles.income}` : `${styles.expense}`}>{typeOfTransfer==="income" ? `+${amount}` : `-${amount}`}</div>
    </div>
  )
};

export default TransactionCard;