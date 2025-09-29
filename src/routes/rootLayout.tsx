import Sidebar from "../components/sidebar/Sidebar";
import styles from './routes.module.css';
import { Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';


// this comment is to see how to call from your backend
// // Define proper TypeScript interface for your API data
// interface ApiData {
//   users: string[];
//   // Add other properties your API returns
// }

export default function RootLayout() {
  // const [backend, setBackend] = useState<ApiData | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // use full backend URL while debugging (or keep "/api" if you have a Vite proxy)
  //       const res = await fetch("http://localhost:5000/api/test");
  //       if (!res.ok) throw new Error(`status ${res.status}`);
  //       const data: ApiData = await res.json();
  //       setBackend(data);
  //     } catch (err) {
  //       // reveal the error instead of silently staying on "loading.."
  //       console.error("fetch /api failed:", err);
  //       setBackend({ users: [] }); // fallback so UI updates; optionally manage an error state
  //     }
  //   })();
  // }, []);

  return (
    <div className={styles.main}>
      {/* {backend?.users ? (
        backend.users.map((user, i) => (
          <ul key={i}>
            <li>{user}</li>
          </ul>
        ))
      ) : (
        <p>loading..</p>
      )} */}

      <Sidebar />
      <Outlet />
    </div>
  );
}