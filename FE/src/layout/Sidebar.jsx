import React from "react";
import Nav from "../components/Nav";
import CartSvg from "../assets/CartSvg";
import SettingsSvg from "../assets/SettingsSvg";
import DashboardSvg from "../assets/DashboardSvg";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-24 h-screen rounded-r-3xl bg-white">
        <div id="logo" className="my-4 ms-2">
          <h1 className="font-bold text-xl">BimBim</h1>
        </div>
        <ul className="flex flex-col justify-start items-center">
          <Link to={"/"}>
            <Nav icon={<DashboardSvg />} text="Dashboard" className="bg-gray-200"/>
          </Link>
          <Link to={"/transactions"}>
            <Nav icon={<CartSvg />} text="Transactions" />
          </Link>
          <Link to={"/settings"}>
            <Nav icon={<SettingsSvg />} text="Settings" />
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
