import React from "react";

function Button(props) {
  const { variant, text, iconLeft, iconRight, className, ...otherProps } =
    props;
  const variants = {
    primary: "bg-[#0079FF] rounded text-white font-semibold",
    secondary: "bg-gray-400 rounded text-white font-semibold",
    success: "bg-[#00DFA2] rounded text-white font-semibold",
    info: "bg-[#F6FA70] rounded text-white font-semibold",
    danger: "bg-[#FF0060] rounded text-white font-semibold",
  };
  let primary = variants[variant];
  return (
    <button
      {...otherProps}
      className={
        "px-4 py-2 flex justify-center items-center gap-2 " + primary + className
      }
    >
      {iconLeft}
      {text}
      {iconRight}
    </button>
  );
}

export default Button;
