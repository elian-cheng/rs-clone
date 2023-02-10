import React from 'react';
import { gamesData } from '../../utils/gamesData';
import { GameCard } from './components/GameCard/GameCard';

export default function GamesPage() {
  return (
    <div className="games__container">
      <div className="games__content">
        <h1 className="games__title title">Choose the game</h1>
        <div className="games__wrapper">
          {gamesData.map(({ id, name, img, description, link }) => (
            <GameCard
              key={id}
              id={id}
              img={img}
              name={name}
              description={description}
              link={link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
