import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GameStatus, IQuiz } from '../QuizPage';
import { IGameRunProps } from './QuizGame';
import ProgressBar from '../../../components/ProgressCircle/ProgressCircle';

export interface IResultProps extends IGameRunProps {
  setQuiz: Dispatch<SetStateAction<IQuiz[]>>;
}

export default function QuizResult({ answers, setAnswers, setQuiz, setStatus }: IResultProps) {
  const nextGame = useCallback(() => {
    setAnswers({ right: 0, wrong: 0, streak: 0, max: 0 });
    setQuiz([]);
    setStatus(GameStatus.SELECT);
  }, []);

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

function getResultText(percent: number) {
  if (percent > 0.5) return 'You can do better! Repeat the lessons and come back! :)';
  if (percent > 0.75) return 'You played very well! But there is still something to work on.';
  if (percent > 0.95) return "You're brilliant! I have nothing to teach you...";
  return 'This time it was not successful, but keep practicing!';
}
