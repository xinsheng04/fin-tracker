import React from 'react'; 
import styles from './sidebar.module.css'

type SidebarProps ={
  children : React.ReactNode;
  onClick : ()=>string;
}

const Sidebar:React.FC<SidebarProps> = (props) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="src\assets\moneyLogo.png" alt="moneyLogo" />
        <h1>FinTracker</h1>
      </div>
      <ul>
        <li>Overview</li>
        <li>My Wallet</li>
        <li>Stats</li>
        <li>Budgeting</li>
      </ul>

    </div>

  )
}

export default Sidebar