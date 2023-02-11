import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GameStatus, IQuiz } from '../QuizPage';

export interface IGameErrorProps {
  setStatus: Dispatch<SetStateAction<GameStatus>>;
  setQuiz: Dispatch<SetStateAction<IQuiz[]>>;
}

export default function QuizError({ setStatus, setQuiz }: IGameErrorProps) {
  const newGame = useCallback(() => {
    setQuiz([]);
    setStatus(GameStatus.SELECT);
  }, []);
  return (
    <div className="quiz__container">
      <div className="quiz__error">
        <h2 className="quiz__error-title">Sorry, there was an unexpected error</h2>
        <p className="quiz__error-description">Please restart the game</p>
        <div className="quiz__error-ations">
          <button className="quiz__error-button button" onClick={newGame}>
            New Game
          </button>
          <Link className="button button_orange" to="/lessons">
            To Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
