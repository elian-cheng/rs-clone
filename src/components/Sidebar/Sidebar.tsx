import React from "react";
import { ReactComponent as LessonsIcon } from "../../assets/images/sidebar/lessons.svg";
import { ReactComponent as PracticeIcon } from "../../assets/images/sidebar/window.svg";
import { ReactComponent as GameIcon } from "../../assets/images/sidebar/games.svg";
import { ReactComponent as StatIcon } from "../../assets/images/sidebar/statistics.svg";
import { ReactComponent as UserIcon } from "../../assets/images/sidebar/user.svg";
import { ReactComponent as Arrow } from "../../assets/images/sidebar/arrowleft.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Arrow className="sidebar__toggle" />
      <div className="sidebar__logo">
        <UserIcon className="sidebar__user-icon" />
        <div className="sidebar__user-name">Guest</div>
      </div>
      <nav className="sidebar__nav">
        <a href="/lessons" className="nav-item">
          <LessonsIcon className="nav-icon" />
          <span className="nav-title">Lessons</span>
        </a>
        <a href="/practice" className="nav-item nav-item_active">
          <PracticeIcon className="nav-icon" />
          <span className="nav-title">Practice</span>
        </a>
        <a href="/games" className="nav-item">
          <GameIcon className="nav-icon" />
          <span className="nav-title">Games</span>
        </a>
        <a href="/statistics" className="nav-item">
          <StatIcon className="nav-icon" />
          <span className="nav-title">Statistics</span>
        </a>
      </nav>
    </div>
  );
}
