import styles from "./CashBalance.module.css";
import calendarLogo from "../../assets/calendarLogo.png";
import React from "react";
import currencyFormatter from "../../util/currencyFormatter";
import { useSelector } from "react-redux";


interface CashBalanceProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  income?: boolean;
  expense?:boolean;
  balance?:boolean
  // function to get the amount from the database using the key
  getDisplayAmount?: (key: string) => void;
}

const CashBalance: React.FC<CashBalanceProps> = ({ title, children,income,expense,balance, className='' }) => {
  const bankAccount = useSelector((state: any) => state.myWallet.bankAccounts);
  const transactions = useSelector((state: any) => state.myWallet.recentTransaction);
  let accIncome = transactions.reduce((acc: number, transaction: any) => {
    if (transaction.typeOfTransfer === "income") {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);
  let accExpense = transactions.reduce((acc: number, transaction: any) =>  {
    if (transaction.typeOfTransfer === "expense")
      return acc + transaction.amount;
    return acc;
  }, 0);
  let totalAmount = 0;
  for (let amount of bankAccount) {
    totalAmount += amount.amount;
  }
  // Set balance to be used with the button down below
  // will be implemented in the future
  return (
    <div className={`${styles.cashBalance} ${className}`}>
      {/* mini header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.datePicker}>
          <img src={calendarLogo} alt="" />
          <p>July 16</p>
        </button>
      </div>
      {/* amount statement */}
      {balance &&<h1 className={styles.balance}>{currencyFormatter(totalAmount)}</h1>}
      {income &&<h1 className={styles.balance}>{currencyFormatter(accIncome)}</h1>}
      {expense &&<h1 className={styles.balance}>{currencyFormatter(accExpense)}</h1>}
      {children}
    </div>
  )
}

export default CashBalance;