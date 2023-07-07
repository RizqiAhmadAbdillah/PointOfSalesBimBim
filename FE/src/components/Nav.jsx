import React from "react";
import { useSelector } from "react-redux";

function Nav(props) {
  const nav = useSelector((state) => state.nav);
  return (
    <>
      <div
        onClick={props.onClick}
        className={`
        flex flex-col w-24 justify-between gap-2 items-center p-4 cursor-pointer ${
          props.value === nav.currentNav ? "bg-gray-200" : ""
        } ${props.className} `}
      >
        <div id="nav__icon">{props.icon}</div>
        <h4 className="text-sm">{props.text}</h4>
      </div>
    </>
  );
}

export default Nav;
