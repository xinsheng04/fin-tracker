import type React from 'react';
import styles from './TransactionDetails.module.css';
import type { TransactionObject } from '../../../util/transactionTypes';

interface TransactionDetailsProps {
  transactionData: TransactionObject;
  
}

const TransactionDetails: React.FC<TransactionDetailsProps> = (
  {
    transactionData
  }
) => {
  const { bankName, cardNo, typeOfTransfer, transactionId, amountTransfered, dateTransfer, category, comment } = transactionData;
  return (
    <div className={styles.transactionDetails}>
      <h1 className={styles.transactionHeader}>Transaction Details</h1>
      <table>
        <tbody>
          <tr>
            <th>Transaction ID</th>
            <td>{transactionId}</td>
          </tr>
          <tr>
            <th>Bank</th>
            <td>{bankName}</td>
          </tr>
          <tr>
            <th>Card Number</th>
            <td>{cardNo}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td className={typeOfTransfer === "income" ? styles.income : styles.expense}>{amountTransfered}</td>
          </tr>
          <tr>
            <th>Date of Transaction</th>
            <td>{dateTransfer}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{category}</td>
          </tr>
          <tr>
            <th>Comments</th>
            <td>{comment}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDetails;