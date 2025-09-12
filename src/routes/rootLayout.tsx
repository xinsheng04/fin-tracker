import Sidebar from "../components/sidebar/Sidebar";

import { Outlet } from "react-router-dom";

export default function RootLayout(){
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}