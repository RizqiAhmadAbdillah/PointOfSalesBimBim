import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="bg-gray-200 text-gray-950 h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
