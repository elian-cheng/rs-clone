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
  // TEXTBOOK,
  ERROR,
}
// {
//   "id": 37,
//   "question": "What is an enum in TypeScript?",
//   "options": [
//     "a) A type that is used to enforce type safety",
//     "b) A type that represents the result of a conditional expression",
//     "c) A way to represent a set of named values in TypeScript",
//     "d) A type that represents an array with a fixed number of elements, each with its own specific type"
//   ],
//   "answer": "c) A way to represent a set of named values in TypeScript",
//   "explanation": "An enum in TypeScript is a way to represent a set of named values. Enums allow you to define a set of named values that represent a specific set of values, such as a set of days of the week or a set of colors. Enums are defined using the \"enum\" keyword, followed by the name of the enum and the set of named values. Each named value in an enum is given a specific integer value, starting from 0, unless you specify a different value. Enums are useful for representing a specific set of values that you want to use throughout your code, while still ensuring type safety and making your code more readable.",
//   "difficulty": "hard"
// }

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
