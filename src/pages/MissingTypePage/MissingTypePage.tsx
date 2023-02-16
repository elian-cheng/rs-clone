import React, { useEffect, useState } from 'react';
import MissingTypeStartPage from './components/MissingTypeStartPage/MissingTypeStartPage';
import MissingTypeTask from './components/MissingTypeTask';
import { GameStatus, IAnswers } from '../QuizPage/QuizPage';
import QuizResult from '../QuizPage/QuizGame/QuizResult';
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
          status={status}
          setStatus={setStatus}
        />
      );
    }
    if (status === GameStatus.RESULT) {
      // return <QuizResult answers={answers} setAnswers={setAnswers} setQuiz={updateTasks} />;
      return <div>results</div>;
    }
  }
  return <article className="missing-type">{switchPage()}</article>;
}
