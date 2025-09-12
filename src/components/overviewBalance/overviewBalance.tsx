import styles from "./overviewBalance.module.css";
import calendarLogo from "src/assets/calendarLogo.png";
import React from "react";
import { useState } from "react";

interface overviewBalanceProps {
  title: string;
  amount: number;
  children: React.ReactNode;
}

const overviewBalance: React.FC<overviewBalanceProps> = ({title, amount, children}) => {
  const [balance, setBalance] = useState<number>(amount);
  // Set balance to be used with the button down below
  // will be implemented in the future
  return(
    <div>
      {/* mini header */}
      <div>
        <h3 className={styles.title}>{title}</h3>
        <button>
          <img src={calendarLogo} alt="" />
          <p>July 16</p>
        </button>
      </div>
      {/* amount statement */}
      <h1>{balance}</h1>
      {children}
    </div>
  )
}

export default overviewBalance;