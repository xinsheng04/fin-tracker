import Sidebar from "../components/sidebar/Sidebar";
import styles from './routes.module.css';
import { Outlet } from "react-router-dom";

export default function RootLayout(){
  return (
    <div className={styles.main}>
      <Sidebar />
      <Outlet />
    </div>
  );
}