import React from 'react'; 
import styles from './sidebar.module.css'
import {NavLink} from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="src\assets\moneyLogo.png" alt="moneyLogo" />
        <h1>FinTracker</h1>
      </div>
      <ul>
        <li>
          <NavLink to="/" end>Overview</NavLink>
        </li>
        <li>
          <NavLink to="/MyWallet">My Wallet</NavLink>
        </li>
        <li>
          <NavLink to="/Stats">Stats</NavLink>
        </li>
        <li>
          <NavLink to="/Budgeting">Budgeting</NavLink>
        </li>
      </ul>

    </div>

  )
}

export default Sidebar