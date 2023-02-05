import React from 'react';
import { Link } from 'react-router-dom';
import { ISidebarItem } from './Sidebar';

export default function SidebarItem(props: ISidebarItem) {
  const {
    Icon,
    title,
    path,
  } = props;

  return (
    <Link to={path} className="nav-item" id={path.split('/')[1]+'Sidebar'}>
    <Icon className="nav-icon" />
    <span className="nav-title">{title}</span>
    </Link>
  );
}
