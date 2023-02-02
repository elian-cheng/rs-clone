import React from "react";
import { ReactComponent as LessonsIcon } from "../../assets/images/sidebar/lessons.svg";
import { ReactComponent as PracticeIcon } from "../../assets/images/sidebar/window.svg";
import { ReactComponent as GameIcon } from "../../assets/images/sidebar/games.svg";
import { ReactComponent as StatIcon } from "../../assets/images/sidebar/statistics.svg";
import { ReactComponent as UserIcon } from "../../assets/images/sidebar/user.svg";
import { ReactComponent as Arrow } from "../../assets/images/sidebar/arrowleft.svg";
import { useLocation } from "react-router";

export default function Sidebar() {
  const toggleNav = (event: MouseEvent) => {
    if ((event.target as HTMLDivElement).classList.contains('sidebar__toggle')) {
      document.querySelector('.sidebar')?.classList.toggle('sidebar_open');
    }
    if ((event.target as HTMLDivElement).classList.contains('nav__item')) {
      document.querySelectorAll('.nav__item').forEach((e) => {
        e.classList.remove('nav__item_active');
      })
    }
  }

  const path = useLocation().pathname;

  React.useEffect(() => {
    addEventListener('click', toggleNav);
    document.getElementById(`${path}`)?.classList.add('nav-item_active');
  })

  return (
    <div className="sidebar">
      <Arrow className="sidebar__toggle" />
      <div className="sidebar__logo">
        <UserIcon className="sidebar__user-icon" />
        <div className="sidebar__user-name">Guest</div>
      </div>
      <nav className="sidebar__nav">
        <a href="/lessons" className="nav-item" id="/lessons">
          <LessonsIcon className="nav-icon" />
          <span className="nav-title">Lessons</span>
        </a>
        <a href="/practice" className="nav-item" id="/practice">
          <PracticeIcon className="nav-icon" />
          <span className="nav-title">Practice</span>
        </a>
        <a href="/games" className="nav-item" id="/games">
          <GameIcon className="nav-icon" />
          <span className="nav-title">Games</span>
        </a>
        <a href="/statistics" className="nav-item" id="/statistics">
          <StatIcon className="nav-icon" />
          <span className="nav-title">Statistics</span>
        </a>
      </nav>
    </div>
  );
}
