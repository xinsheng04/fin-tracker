import React from "react";
import styles from "./sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ always up-to-date

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="src/assets/moneyLogo.png" alt="moneyLogo" />
        <h1>FinTracker</h1>
      </div>
      <nav>
        <ul>
          <li>
            <button
              className={location.pathname === "/Overview" ? styles.active : ""}
              onClick={() => navigateTo("/Overview")}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              className={location.pathname === "/MyWallet" ? styles.active : ""}
              onClick={() => navigateTo("/MyWallet")}
            >
              My Wallet
            </button>
          </li>
          <li>
            <button
              className={location.pathname === "/Stats" ? styles.active : ""}
              onClick={() => navigateTo("/Stats")}
            >
              Stats
            </button>
          </li>
          <li>
            <button
              className={location.pathname === "/Budgeting" ? styles.active : ""}
              onClick={() => navigateTo("/Budgeting")}
            >
              Budgeting
            </button>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigateTo("/")}>Logout</button>
          </li>
          <li>
            <button>Dark Mode 🌙</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
