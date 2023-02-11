import React from 'react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { GameStatus, IQuiz } from '../QuizPage';
import { BASE_URL } from '../../../API/URL';
import axios from 'axios';

const getQuizAPI = (difficulty: string) => {
  return `${BASE_URL}quiz?difficulty=${difficulty}`;
};

export const getQuizData = async (difficulty: string) => {
  return axios.get(getQuizAPI(difficulty));
};

export interface IDifficultyProps {
  setStatus: Dispatch<SetStateAction<GameStatus>>;
  quiz: IQuiz[];
  setQuiz: Dispatch<SetStateAction<IQuiz[]>>;
}

const difficulties = ['easy', 'medium', 'hard'];

export default function QuizDescription({ setStatus, quiz, setQuiz }: IDifficultyProps) {
  const [active, setActive] = useState('');

  const getQuiz = useCallback(
    async (key: string) => {
      setActive(key);
      if (key !== active) await getQuizData(key).then(({ data }) => setQuiz(data.slice(0, 10)));
    },
    [active, setQuiz]
  );

  return (
    <div className="quiz__container">
      <article className="quiz__wrapper">
        <h2 className="quiz__title title">Quiz</h2>
        <p className="quiz__subtitle subtitle">A test to train theory knowledge</p>
        <ul className="quiz__description">
          <li className="quiz__description-item">
            You need to choose 1 correct answer to the question on the top.
          </li>
          <li className="quiz__description-item">Use your mouse to choose the answer.</li>
          <li className="quiz__description-item">
            You can also use Numpad keys from 1 to 4 to choose the answer.
          </li>
          <li className="quiz__description-item">
            Use the space for a tip or to move to the next question.
          </li>
        </ul>
      </article>

      <div className="quiz__difficulty">
        <p className="quiz__subtitle subtitle">Choose the difficulty level:</p>
        <div className="quiz__difficulty-select">
          {difficulties.map((key) => (
            <DifficultyButton key={key} isActive={key === active} onClick={() => getQuiz(key)}>
              {key}
            </DifficultyButton>
          ))}
        </div>
        <button
          className="button"
          disabled={quiz.length === 0}
          onClick={() => setStatus(GameStatus.GAME)}
        >
          Start
        </button>
      </div>
    </div>
  );
}

interface DifficultyButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function DifficultyButton(props: DifficultyButtonProps) {
  return (
    <button
      className="quiz__difficulty-button"
      style={{
        backgroundColor: props.isActive ? '#f4976c' : '#fbe8a6',
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
