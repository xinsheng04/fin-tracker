import styles from "./CashBalance.module.css";
import calendarLogo from "../../assets/calendarLogo.png";
import React from "react";
import currencyFormatter from "../../util/currencyFormatter";
import { useState } from "react";

interface CashBalanceProps {
  title: string;
  children?: React.ReactNode;
  // function to get the amount from the database using the key
  getDisplayAmount?: (key: string) => void;
}

const CashBalance: React.FC<CashBalanceProps> = ({title, children}) => {
  // 5000 is just a placeholder
  const [balance, setBalance] = useState<number>(5000);
  // Set balance to be used with the button down below
  // will be implemented in the future
  return(
    <div className={styles.cashBalance}>
      {/* mini header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.datePicker}>
          <img src={calendarLogo} alt="" />
          <p>July 16</p>
        </button>
      </div>
      {/* amount statement */}
      <h1 className={styles.balance}>{currencyFormatter(balance)}</h1>
      {children}
    </div>
  )
}

export default CashBalance;