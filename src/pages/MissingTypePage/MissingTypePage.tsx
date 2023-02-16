import React, { useState } from 'react';
import MissingTypeStartPage from './components/MissingTypeStartPage/MissingTypeStartPage';
import MissingTypeTask from './components/MissingTypeTask';
import { GameStatus, IAnswers } from '../QuizPage/QuizPage';
import GameResults, { IGameResultProps } from '../../components/GameResults/GameResults';
export interface IMissingTypeTask {
  id: number;
  question: string;
  options: string[];
  answer: string;
}
export default function MissingTypePage() {
  const [tasks, setTasks] = useState<IMissingTypeTask[]>([]);
  const [status, setStatus] = useState(GameStatus.SELECT);
  const [answers, setAnswers] = useState<IAnswers>({
    right: 0,
    wrong: 0,
    strike: 0,
    max: 0,
  });
  const gameResultsObj: IGameResultProps = {
    answers: answers,
    setAnswers: setAnswers,
    setGameTasks: setTasks,
    setStatus: setStatus,
  };
  function switchPage() {
    if (status === GameStatus.SELECT) {
      return <MissingTypeStartPage setStatus={setStatus} />;
    }
    if (status === GameStatus.GAME) {
      return (
        <MissingTypeTask
          answers={answers}
          setAnswers={setAnswers}
          tasks={tasks}
          setTasks={setTasks}
          setStatus={setStatus}
        />
      );
    }
    if (status === GameStatus.RESULT) {
      return <GameResults gameResultsObj={gameResultsObj} />;
    }
  }
  return <article className="missing-type">{switchPage()}</article>;
}
