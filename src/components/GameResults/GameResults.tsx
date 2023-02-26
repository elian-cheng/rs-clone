import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IMissingTypeTask } from '../../pages/MissingTypePage/MissingTypePage';
import { GameStatus, IAnswers, IQuiz } from '../../pages/QuizPage/QuizPage';
import ProgressBar from '../ProgressCircle/ProgressCircle';

export interface IGameResultProps {
  answers: IAnswers;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  setGameTasks: Dispatch<SetStateAction<IQuiz[]>> | Dispatch<SetStateAction<IMissingTypeTask[]>>;
  setStatus: Dispatch<SetStateAction<number>>;
}

export default function GameResults({ gameResultsObj }: { gameResultsObj: IGameResultProps }) {
  const { answers, setAnswers, setGameTasks, setStatus } = gameResultsObj;
  const nextGame = useCallback(() => {
    setAnswers({ right: 0, wrong: 0, strike: 0, max: 0 });
    setGameTasks([]);
    setStatus(GameStatus.SELECT);
  }, []);

  function getResultText(percent: number) {
    if (percent > 95) return "You're brilliant! I have nothing to teach you...";
    if (percent > 75) return 'You played very well! But there is still something to work on.';
    if (percent > 50) return 'You can do better! Repeat the lessons and come back! :)';
    return 'This time it was not successful, but keep practicing!';
  }

  return (
    <div className="results__container">
      <div className="results__wrapper">
        <h2 className="results__title title">Results</h2>
        <div className="results__content">
          <p className="result__description description">
            {getResultText((answers.right / (answers.right + answers.wrong)) * 100)}
          </p>
          <h3 className="results__subtitle subtitle">
            {answers.right} correct answers, {answers.wrong} wrong answers
          </h3>
          <ProgressBar
            percent={Math.ceil((answers.right / (answers.right + answers.wrong)) * 100)}
          />
          <div className="results__ations">
            <button className="results__button button" onClick={() => nextGame()}>
              Play again
            </button>
            <Link className="results__link button button_orange" to="/lessons">
              To lessons
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
