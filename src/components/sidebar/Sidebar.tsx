import React from 'react'; 
import styles from './sidebar.module.css'
import { useNavigate } from "react-router";

type SidebarProps ={
  children : React.ReactNode;
  onClick : ()=>string;
}

const Sidebar:React.FC<SidebarProps> = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.logo}>
        <img src="src\assets\moneyLogo.png" alt="moneyLogo" />
        <h1>FinTracker</h1>
      </div>
      <nav>
        <ul>
          <li><button onClick={() => navigate('/')}>Home</button></li>
          <li><button onClick={() => navigate('/mywallet')}>My Wallet</button></li>
          <li><button onClick={() => navigate('/statistics')}>Statistics</button></li>
          <li><button onClick={() => navigate('/budgeting')}>Budgeting</button></li>
        </ul>
      </nav>
    </>

  )
}

export default Sidebar