import React from 'react';
import { Link } from 'react-router-dom';
import Burger from '../Sidebar/Burger/Burger';

export default function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" />
        <Burger />
      </div>
    </div>
  );
}
