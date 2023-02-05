import React, { useContext } from 'react';
import { ReactComponent as LessonsIcon } from '../../assets/icons/sidebar/lessons.svg';
import { ReactComponent as PracticeIcon } from '../../assets/icons/sidebar/window.svg';
import { ReactComponent as GameIcon } from '../../assets/icons/sidebar/games.svg';
import { ReactComponent as StatIcon } from '../../assets/icons/sidebar/statistics.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/sidebar/profile.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/sidebar/info.svg';
import { ReactComponent as LoginIcon } from '../../assets/icons/sidebar/login-arrow.svg';
import { ReactComponent as Arrow } from '../../assets/icons/sidebar/arrowleft.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../Popup/UserContext';

interface ISidebar {
  onSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: ISidebar) {
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
      document.querySelector('.sidebar')?.classList.toggle('sidebar_open');
    }
    if (navBtn) {
      document.querySelectorAll('.nav-item').forEach((e) => {
        e.classList.remove('nav-item_active');
      });
      navBtn.classList.add('nav-item_active');
    }
  };

  React.useEffect(() => {
    addEventListener('click', sidebarAction);
    return () => {
      removeEventListener('click', sidebarAction);
    };
  }, []);

  return (
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
        <Link to="/lessons" className="nav-item">
          <LessonsIcon className="nav-icon" />
          <span className="nav-title">Lessons</span>
        </Link>
        <Link to="/practice" className="nav-item">
          <PracticeIcon className="nav-icon" />
          <span className="nav-title">Practice</span>
        </Link>
        <Link to="/games" className="nav-item">
          <GameIcon className="nav-icon" />
          <span className="nav-title">Games</span>
        </Link>
        <Link to="/statistics" className="nav-item">
          <StatIcon className="nav-icon" />
          <span className="nav-title">Statistics</span>
        </Link>
      </nav>
      <div className="sidebar__login">
        {user ? (
          <button className="sidebar__login-btn nav-item" onClick={logOut}>
            <LoginIcon className="nav-icon login-icon" />
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
  );
}
