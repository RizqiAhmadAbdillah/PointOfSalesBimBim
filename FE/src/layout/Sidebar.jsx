import React from "react";
import Nav from "../components/Nav";
import CartSvg from "../assets/CartSvg";
import SettingsSvg from "../assets/SettingsSvg";
import DashboardSvg from "../assets/DashboardSvg";
import ProductsSvg from "../assets/ProductsSvg";
import { useDispatch } from "react-redux";
import {
  NAVS,
  setToDashboard,
  setToProducts,
  setToSettings,
  setToTransaction,
} from "../features/navSlice";

function Sidebar() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="fixed top-0 left-0 z-10 w-24 h-screen rounded-r-3xl bg-white">
        <div id="logo" className="my-4 ms-2">
          <h1 className="font-bold text-xl">BimBim</h1>
        </div>
        <ul className="flex flex-col justify-start items-center">
          <Nav
            icon={<DashboardSvg />}
            text="Dashboard"
            value={NAVS.DASHBOARD}
            onClick={() => dispatch(setToDashboard())}
          />
          <Nav
            icon={<CartSvg />}
            text="Transactions"
            value={NAVS.TRANSACTION}
            onClick={() => dispatch(setToTransaction())}
          />
          <Nav
            icon={<ProductsSvg />}
            text="Products"
            value={NAVS.PRODUCTS}
            onClick={() => dispatch(setToProducts())}
          />
          <Nav
            icon={<SettingsSvg />}
            text="Settings"
            value={NAVS.SETTINGS}
            onClick={() => dispatch(setToSettings())}
          />
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
