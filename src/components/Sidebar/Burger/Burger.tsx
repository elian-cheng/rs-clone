import React, { useEffect, useState } from "react";

type Props = {
  onClick: () => void;
  className: string;
};

export default function Burger(props: Props) {
  // const burgerAction = (event: MouseEvent) => {
  //   const burgerBtn = (event.target as HTMLElement).closest('.sidebar-burger');
  //   if (burgerBtn || (event.target as HTMLElement).classList.contains('sidebar-wrapper_open')) {
  //     document.querySelector('.sidebar-wrapper')?.classList.toggle('sidebar-wrapper_open');
  //     document.querySelector('.sidebar-burger')?.classList.toggle('activebrgr');
  //     document.body.classList.toggle('scroll-lock');
  //   }
  // }

  // const [barOpen, setActive] = useState(false);
  // const barToggle = () => {
  //   setActive(!barOpen);
  // };



  // useEffect(() => {                                 
  //   addEventListener('click', burgerAction);
  //   return () => {
  //     removeEventListener('click', burgerAction)
  //   }
  // }, [])

  return (
   <div onClick={props.onClick} className={props.className}>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
   </div>
 );
}
