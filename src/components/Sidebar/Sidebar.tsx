import React, { useEffect, useState } from 'react';
import { ReactComponent as UserIcon } from '../../assets/icons/sidebar/profile.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/sidebar/info.svg';
import { ReactComponent as LoginIcon } from '../../assets/icons/sidebar/login-arrow.svg';
import { ReactComponent as Arrow } from '../../assets/icons/sidebar/arrowleft.svg';
import SidebarItem from './SidebarItem';
import { sidebarItems } from '../../utils/sidebarItems';
import storage from '../../utils/storage';
import { IGetUSer } from '../../API/authorization';
import Burger from './Burger/Burger';

export interface ISidebarItem {
  id: number;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  title: string;
  path: string;
}

interface ISidebar {
  onSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: ISidebar) {
  const { onSignInOpen } = props;
  const userData = storage.getItem<IGetUSer>('userData');
  const [user, setUser] = useState(userData);

  const logOut = () => {
    localStorage.removeItem('userData');
    location.reload();
    setUser(null);
  };
  
  const [barOpen, setActive] = useState(false);
  const barToggle = (burger = false) => {
    setActive(!barOpen);
    if (burger) document.body.classList.toggle('scroll-lock');
  };

  const sidebarAction = (event: MouseEvent) => {
    if (window.innerWidth < 1001) {
      if ((event.target as HTMLElement).classList.contains('sidebar-wrapper') || (event.target as HTMLElement).closest('.nav-item')) {
        barToggle();
      }
    }
  };

  useEffect(() => {
    addEventListener('click', sidebarAction);
    return () => {
      removeEventListener('click', sidebarAction);
    };
  });

  return (
    <div className="sidebar-section">
      <Burger onClick={() => barToggle(true)} className={!barOpen? "sidebar-burger":"sidebar-burger activebrgr"}/>
      <div className={!barOpen? "sidebar-wrapper": "sidebar-wrapper sidebar-wrapper_open"}>
        <div className="sidebar">
            <Arrow onClick={() => barToggle(false)} className="sidebar__toggle" />
            <div className="sidebar__logo">
              <UserIcon className="sidebar__user-icon" />
              {user ? (
                <div className="sidebar__user-name">{user.name}</div>
              ) : (
                <div className="sidebar__login-wrapper">
                  <div className="sidebar__user-name">Guest</div>
                  <button className="sidebar__info-icon">
                    <InfoIcon></InfoIcon>
                    <span className="tooltip-text">
                      Without authorization you don't have access to all functionality.
                    </span>
                  </button>
                </div>
              )}
            </div>
            <nav className="sidebar__nav">
              {sidebarItems.map((item, i) => {
                return <SidebarItem key={i} {...item} />;
              })}
            </nav>
            <div className="sidebar__login">
              {user ? (
                <button className="sidebar__login-btn nav-item" onClick={logOut}>
                  <LoginIcon className=" nav-icon login-icon" />
                  <span className="nav-title">Log out</span>
                </button>
              ) : (
                <button className="sidebar__login-btn nav-item" onClick={() => onSignInOpen(true)}>
              <LoginIcon className="nav-icon login-icon" />
              <span className="nav-title">Log in</span>
            </button>
          )}
            </div>
        </div>
      </div>
    </div>
  );
}
