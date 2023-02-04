import React from "react";
import { ReactComponent as UserIcon } from "../../assets/images/sidebar/user.svg";
import { ReactComponent as Arrow } from "../../assets/images/sidebar/arrowleft.svg";
import SidebarItem from "./SidebarItem";

export interface ISidebarItem {
  id: number;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  path: string;
}

interface Items {
  items: ISidebarItem[]
}

export default function Sidebar(props: Items) {
  const { items } = props;

  const sidebarAction = (event: MouseEvent) => {
    const openBtn = (event.target as HTMLElement).closest('.sidebar__toggle');
    const navBtn = (event.target as HTMLElement).closest('.nav-item');
    if (openBtn) {
      document.querySelector('.sidebar-wrapper')?.classList.toggle('sidebar-wrapper_open');
    }
    if (navBtn && document.querySelector('.activebrgr')) {
      document.querySelector('.sidebar-wrapper')?.classList.toggle('sidebar-wrapper_open');
      document.querySelector('.sidebar-burger')?.classList.toggle('activebrgr');
    }

    const curLocation = location.pathname.split('/')[1];
    document.querySelectorAll('.nav-item').forEach((e) => {
      e.classList.remove('nav-item_active');
    });
    const curNav = document.getElementById(`${curLocation}Sidebar`);
    curNav?.classList.add('nav-item_active');
  }

  React.useEffect(() => {
    addEventListener('click', sidebarAction);
    return () => {
      removeEventListener('click', sidebarAction)
    }
  }, [])

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <Arrow className="sidebar__toggle" />
        <div className="sidebar__logo">
          <UserIcon className="sidebar__user-icon" />
          <div className="sidebar__user-name">Guest</div>
        </div>
        <nav className="sidebar__nav">
          {items.map((item) => {
            return <SidebarItem key={item.id} {...item} />
          })}
        </nav>
      </div>
    </div>
  );
}
