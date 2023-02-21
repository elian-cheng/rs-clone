import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ISidebarItem } from './Sidebar';

export default function SidebarItem(props: ISidebarItem) {
  const {
    Icon,
    title,
    path,
  } = props;

  const [curPath, setPath] = useState(location.pathname.split('/')[1]);

  const navAction = () => {
    setPath(location.pathname.split('/')[1])
  }

  useEffect(() => {
    addEventListener('click', navAction);
    return () => {
      removeEventListener('click', navAction);
    };
  }, []);

  return (
    <Link to={path} className={curPath === path.split('/')[1]? "nav-item nav-item_active":"nav-item"}>
    <Icon className="nav-icon" />
    <span className="nav-title">{title}</span>
    </Link>
  );
}
