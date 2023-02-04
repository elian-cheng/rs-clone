import React from "react";

export default function Burger() {
  const burgerAction = (event: MouseEvent) => {
    const burgerBtn = (event.target as HTMLElement).closest('.sidebar-burger');
    if (burgerBtn || (event.target as HTMLElement).classList.contains('sidebar-wrapper_open')) {
      document.querySelector('.sidebar-wrapper')?.classList.toggle('sidebar-wrapper_open');
      document.querySelector('.sidebar-burger')?.classList.toggle('activebrgr');
    }
  }

  React.useEffect(() => {
    addEventListener('click', burgerAction);
    return () => {
      removeEventListener('click', burgerAction)
    }
  }, [])

  return (
   <div className="sidebar-burger">
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
      <div className="sidebar-burger__dash"></div>
   </div>
 );
}
