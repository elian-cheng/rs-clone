import React from "react";
import Sidebar from "../Sidebar/Sidebar";

export default function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <a className="header__logo" href="/"></a>
      </div>
      <Sidebar/>
    </div>
  );
}
