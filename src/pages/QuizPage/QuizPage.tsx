import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizDescription from './QuizGame/QuizDescription';
import QuizError from './QuizGame/QuizError';
import QuizGame from './QuizGame/QuizGame';
import QuizResult from './QuizGame/QuizResult';

export enum GameStatus {
  SELECT,
  GAME,
  RESULT,
  ERROR,
}

export interface IQuiz {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
export interface IAnswers {
  right: number;
  wrong: number;
  streak: number;
  max: number;
}

export default function QuizPage() {
  const { state } = useLocation();
  const [status, setStatus] = useState(GameStatus.SELECT);
  const [quiz, setQuiz] = useState<IQuiz[]>((state as IQuiz[] | null) || []);
  const [answers, setAnswers] = useState<IAnswers>({
    right: 0,
    wrong: 0,
    streak: 0,
    max: 0,
  });

  if (status === GameStatus.SELECT)
    return <QuizDescription quiz={quiz} setQuiz={setQuiz} setStatus={setStatus} />;

  if (status === GameStatus.RESULT)
    return (
      <QuizResult
        answers={answers}
        quiz={quiz}
        setAnswers={setAnswers}
        setQuiz={setQuiz}
        setStatus={setStatus}
      />
    );

  if (status === GameStatus.GAME)
    return <QuizGame quiz={quiz} answers={answers} setStatus={setStatus} setAnswers={setAnswers} />;

  return <QuizError setStatus={setStatus} setQuiz={setQuiz} />;
}
