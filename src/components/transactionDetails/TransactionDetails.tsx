import type React from 'react';
import type {TransactionsType} from '../../store/transaction';
import styles from './TransactionDetails.module.css';

export const TransactionDetails: React.FC<TransactionsType> = (
  {
    bank, 
    amount, 
    typeOfTransfer, 
    category, 
    date, 
    cardNo, 
    comments
  }
) => {
  return (
    <div className={styles.transactionDetails}>
      <h1 className={styles.transactionHeader}>Transaction Details</h1>
      <table>
        <tbody>
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