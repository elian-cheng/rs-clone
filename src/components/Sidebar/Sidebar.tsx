import React from "react";
import { ReactComponent as LessonsIcon } from "../../assets/images/sidebar/lessons.svg";
import { ReactComponent as PracticeIcon } from "../../assets/images/sidebar/window.svg";
import { ReactComponent as GameIcon } from "../../assets/images/sidebar/games.svg";
import { ReactComponent as StatIcon } from "../../assets/images/sidebar/statistics.svg";
import { ReactComponent as UserIcon } from "../../assets/images/sidebar/user.svg";
import { ReactComponent as Arrow } from "../../assets/images/sidebar/arrowleft.svg";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const sidebarAction = (event: MouseEvent) => {
    const openBtn = (event.target as HTMLElement).closest('.sidebar__toggle');
    const navBtn = (event.target as HTMLElement).closest('.nav-item');
    if (openBtn) {
      document.querySelector('.sidebar')?.classList.toggle('sidebar_open');
    }
    if (navBtn) {
      document.querySelectorAll('.nav-item').forEach((e) => {
        e.classList.remove('nav-item_active');
      })
      navBtn.classList.add('nav-item_active');
    }
  }

  React.useEffect(() => {
    addEventListener('click', sidebarAction);
    return () => {
      removeEventListener('click', sidebarAction)
    }
  }, [])

  return (
    <div className="sidebar">
      <Arrow className="sidebar__toggle" />
      <div className="sidebar__logo">
        <UserIcon className="sidebar__user-icon" />
        <div className="sidebar__user-name">Guest</div>
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
    </div>
  );
}
