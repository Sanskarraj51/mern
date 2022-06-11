import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {

  const { pathname } = useLocation();

  return (
    <div className={`sticky top-0 flex     z-20 flex-col w-screen h-min ${pathname === "/login" ? "bg-[#2370B5]":"bg-[#18BA60]"}  `}   >
      <div className="flex justify-between  items-center px-4 sm:px-10 py-6   shadow-xl">
        <Link to="/" className="w-12 ">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png?20220125121207" alt="" />
        </Link>




      </div>
    </div>
  );
}

export default Header;
