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
      <h2>Sorry there was an unexpected error. Please restart the game</h2>
      <div className="quiz__wrapper">
        <button onClick={newGame}>New Game</button>
        <Link to="/lessons">To Lessons</Link>
      </div>
    </div>
  );
}
