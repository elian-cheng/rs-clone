import React from 'react';
import { Link } from 'react-router-dom';

type GameCardProps = {
  id: number;
  img: string;
  name: string;
  description: string;
  link: string;
};

export const GameCard: React.FC<GameCardProps> = ({ id, img, name, description, link }) => {
  return (
    <div key={name} className="game">
      <div className="game__card">
        <div className="game__top">
          <div className="game__image-block">
            <div className="game__image">
              <img alt={name} src={img} className="" />
            </div>
          </div>
          <div className="game__title">
            <p className="game__name name-title">{name}</p>
          </div>
        </div>
        <div className="game__info">
          <p className="game__description description">{description}</p>
        </div>
        <div className="game__start">
          <Link to={link} className={`game__link button game__link_${id}`}>
            Start
          </Link>
        </div>
      </div>
    </div>
  );
};
