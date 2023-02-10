import React, { Dispatch, SetStateAction } from 'react';
import { IQuiz } from '../QuizPage';
import { IGameRunProps } from './QuizGame';

export interface IResultProps extends IGameRunProps {
  setQuiz: Dispatch<SetStateAction<IQuiz[]>>;
}

export default function QuizResult({ quiz, setAnswers, setQuiz, setStatus }: IResultProps) {
  return <div>QuizResult</div>;
}
