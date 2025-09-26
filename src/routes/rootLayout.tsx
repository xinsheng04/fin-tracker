import Sidebar from "../components/sidebar/Sidebar";
import styles from './routes.module.css';
import { Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';

// Define proper TypeScript interface for your API data
interface ApiData {
  users: string;
  // Add other properties your API returns
}

export default function RootLayout() {
  const [backend, setBackend] = useState<String | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // use full backend URL while debugging (or keep "/api" if you have a Vite proxy)
        const res = await fetch("http://localhost:5000/api/login");
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data: ApiData = await res.json();
        setBackend(String(data));
      } catch (err) {
        // reveal the error instead of silently staying on "loading.."
        console.error("fetch /api failed:", err);
        setBackend(String(err) ); // fallback so UI updates; optionally manage an error state
      }
    })();
  }, []);

  return (
    <div className={styles.main}>
      <p>{backend}</p>

      <Sidebar />
      <Outlet />
    </div>
  );
}