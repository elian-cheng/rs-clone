import React, { useContext } from 'react';
import { ReactComponent as UserIcon } from '../../assets/icons/sidebar/profile.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/sidebar/info.svg';
import { ReactComponent as LoginIcon } from '../../assets/icons/sidebar/login-arrow.svg';
import { ReactComponent as Arrow } from '../../assets/icons/sidebar/arrowleft.svg';
import { UserContext } from '../../context/UserContext';
import SidebarItem from './SidebarItem';
import { sidebarItems } from '../../utils/sidebarItems';

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

interface Itest {
  items: ISidebarItem[];
}

const x: Itest = {
  items: sidebarItems,
};

export default function Sidebar(props: ISidebar) {
  const { items } = x;
  const { onSignInOpen } = props;
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

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
  };

  React.useEffect(() => {
    addEventListener('click', sidebarAction);
    return () => {
      removeEventListener('click', sidebarAction);
    };
  }, []);

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        <Arrow className="sidebar__toggle" />
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
          {items.map((item) => {
            return <SidebarItem key={item.id} {...item} />;
          })}
        </nav>
        <div className="sidebar__login">
          {user ? (
            <button className="sidebar__login-btn" onClick={logOut}>
              <LoginIcon className="login-icon" />
              <span className="login-title">Log out</span>
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
  );
}
