import styles from './transactionCard.module.css';

interface TransactionCardProps {
  bank: string;
  cardNo: string;
  typeOfTransfer: string;
  amount: number;
  date:string;
  category: string;
  comments: string;
  viewDetailsOnClick: (transaction: any) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ bank, cardNo, typeOfTransfer, amount, date, category, comments, viewDetailsOnClick }) => {
  return (
    <div className={styles.main}>
      <div key={cardNo} className={styles.transactionItem} onClick={() => viewDetailsOnClick({ bank, cardNo, typeOfTransfer, amount, date, category, comments })}>
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