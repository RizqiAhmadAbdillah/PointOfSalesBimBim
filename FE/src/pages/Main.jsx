import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import Settings from "./Settings";

function Main() {
  const nav = useSelector((state) => state.nav);

  return (
    <>
      <div className="flex pt-4 pe-4 gap-4 h-screen">
        {nav.dashboardNav === true ? <Dashboard /> : ""}
        {nav.transactionNav === true ? <Transaction /> : ""}
        {nav.settingsNav === true ? <Settings /> : ""}
      </div>
    </>
  );
}

export default Main;
