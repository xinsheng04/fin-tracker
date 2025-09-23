import type React from 'react';
import styles from './TransactionDetails.module.css';
import { useSelector } from 'react-redux';

const TransactionDetails: React.FC<{id: string}> = (
  {
    id
  }
) => {
  const { bank, amount, typeOfTransfer, category, date, cardNo, comments } = useSelector((state: any) => state.transaction.recentTransaction)
  .find((tr: any) => tr.id === id);
  return (
    <div className={styles.transactionDetails}>
      <h1 className={styles.transactionHeader}>Transaction Details</h1>
      <table>
        <tbody>
          <tr>
            <th>Transaction ID</th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>Bank</th>
            <td>{bank}</td>
          </tr>
          <tr>
            <th>Card Number</th>
            <td>{cardNo}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td className={typeOfTransfer==="income" ? styles.income : styles.expense}>{amount}</td>
          </tr>
          <tr>
            <th>Date of Transaction</th>
            <td>{date}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{category}</td>
          </tr>
          <tr>
            <th>Comments</th>
            <td>{comments}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDetails;