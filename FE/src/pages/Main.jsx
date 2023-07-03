import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import Settings from "./Settings";
import { NAVS } from "../features/navSlice";

function Main() {
  return (
    <>
      <div className="flex pt-4 pe-4 gap-4 h-screen">
        <CurrentPage />
      </div>
    </>
  );
}
function CurrentPage() {
  const nav = useSelector((state) => state.nav);
  switch (nav.currentNav) {
    case NAVS.DASHBOARD:
      return <Dashboard />;
    case NAVS.TRANSACTION:
      return <Transaction />;
    case NAVS.SETTINGS:
      return <Settings />;
    default:
      return "";
  }
}

export default Main;
