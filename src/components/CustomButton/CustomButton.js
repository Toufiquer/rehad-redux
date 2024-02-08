import React from "react";

const CustomButton = ({ handler, id, type = "notClose", children }) => {
  const btnStyle = `px-4 py-2 rounded-full  block  mt-8 hover:opacity-90 active:opacity-100 active:scale-95 `;
  const btnBgColor = `${type === "close" ? " bg-red-500" : " bg-cyan ml-auto"}`;
  const handleButton = () => {
    if (type === "submit" || type === "close") {
      handler();
    } else {
      handler(id);
    }
  };
  return (
    <>
      <button onClick={handleButton} className={btnStyle + btnBgColor}>
        {children}
      </button>
    </>
  );
};

export default CustomButton;
