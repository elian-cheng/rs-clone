import React from "react";

type Props = {
  onClick: () => void;
  className: string;
};

export default function Burger(props: Props) {
  return (
   <div onClick={props.onClick} className={props.className}>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
   </div>
 );
}
