import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" />
      </div>
    </div>
  );
}
