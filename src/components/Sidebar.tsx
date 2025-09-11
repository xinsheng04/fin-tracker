import React from 'react'; 
import styles from './sidebar.module.css'

type SidebarProps ={
  children : React.ReactNode;
  onClick : ()=>string;
}

const Sidebar:React.FC<SidebarProps> = (props) => {
  return (
    <>
      <div className={styles.logo}>
        <img src="src\assets\moneyLogo.png" alt="moneyLogo" />
        <h1>FinTracker</h1>
      </div>
      <p>Menu</p>
    </>

  )
}

export default Sidebar