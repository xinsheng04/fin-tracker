import styles from "./CashBalance.module.css";
import calendarLogo from "../../assets/calendarLogo.png";
import React from "react";
import currencyFormatter from "../../util/currencyFormatter";
import calcIncomeOrExpense from "../../util/calcIncomeOrExpense";
import { useSelector } from "react-redux";
import { useGetCards } from "../../api/walletApi";
import { useGetAllTransactions } from "../../api/transactionAPI";


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
  const { data: cards, isLoading, isError, error } = useGetCards(useSelector((state: any) => state.userInfo.email));
  const { data: transactions } = useGetAllTransactions(useSelector((state: any) => state.userInfo.email));

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    console.error('Error fetching cards: ', error);
    return <p>Error loading cards. Please try again later.</p>
  }

  // To be implemented in the future: get only transactions from last 30 days
  const accIncome = transactions && income ? calcIncomeOrExpense(transactions, "income") : 0;
  const accExpense = transactions && expense ? calcIncomeOrExpense(transactions, "expense") : 0;

  let totalAmount = 0;
  for (let card of cards) {
    totalAmount += Number(card.cardBalance);
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