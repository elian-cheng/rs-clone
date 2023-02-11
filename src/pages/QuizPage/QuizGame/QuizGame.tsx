import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserContext } from '../../../context/UserContext';
import { GameStatus, IAnswers, IQuiz } from '../QuizPage';

export interface IGameRunProps {
  quiz: IQuiz[];
  answers: IAnswers;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  setStatus: Dispatch<SetStateAction<GameStatus>>;
}

const NUM_KEYS = ['1', '2', '3', '4'];

export default function QuizGame({
  quiz,
  // answers,
  setStatus,
  setAnswers,
}: IGameRunProps) {
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line
  const [variables, setVariables] = useState<string[]>([]);
  // eslint-disable-next-line
  const [isAnswered, setIsAnswered] = useState(false);
  // eslint-disable-next-line
  const [isRight, setIsRight] = useState(false);
  // eslint-disable-next-line
  const { user } = useContext(UserContext);

  const checkAnswer = useCallback(
    (option: string) => {
      const currentIsRight = option === quiz[current].answer;
      setIsRight(currentIsRight);
      if (currentIsRight)
        setAnswers((prev) => ({
          ...prev,
          ...{
            right: prev.right + 1,
            streak: prev.streak + 1,
          },
        }));
      else {
        setAnswers((prev) => ({
          ...prev,
          ...{
            wrong: prev.wrong + 1,
            max: prev.max < prev.streak ? prev.streak : prev.max,
            streak: 0,
          },
        }));
      }
      // if (user)
      //   addStats({
      //     isRight: currentIsRight,
      //     id: quiz[current].id,
      //   });
      setIsAnswered(true);
    },
    [current]
  );

  const nextQuestion = useCallback(() => {
    if (current === quiz.length - 1) {
      // if (user) addStatistics ({ answers})
      setStatus(GameStatus.RESULT);
    } else {
      setCurrent((prev) => prev + 1);
      setIsAnswered(false);
    }
  }, [isAnswered]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        if (isAnswered) nextQuestion();
        else checkAnswer('');
      }
      if (NUM_KEYS.includes(e.key) && !isAnswered) {
        checkAnswer(variables[+e.key - 1]);
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [isAnswered]);

  return (
    <div className="quiz__container">
      <div className="quiz__wrapper">
        <div className="quiz__game-top">
          <p className="quiz__game-subtitle subtitle">Question {current + 1} / 10</p>
          <p className="quiz__game-question">{quiz[current].question}</p>
        </div>
        <div className="quiz__game-content">
          <div className="quiz__game-answers">
            {quiz[current].options.map((option) => (
              <AnswerButton
                key={option}
                isRight={option === quiz[current].answer}
                isAnswered={isAnswered}
                onClick={() => {
                  if (!isAnswered) checkAnswer(option);
                }}
              >
                {option}
              </AnswerButton>
            ))}
          </div>
          <div className="quiz__game-explanation">
            <p className="quiz__game-info">
              {isAnswered ? quiz[current].explanation : 'Please choose the answer'}
            </p>
          </div>
          <div className="quiz__game-action">
            <button
              className="quiz__next-button button"
              onClick={() => (isAnswered ? nextQuestion() : checkAnswer(''))}
            >
              {!isAnswered ? 'Skip question' : current === 9 ? 'Check Results' : 'Next question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnswerButtonProps {
  isRight: boolean;
  isAnswered: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function AnswerButton(props: AnswerButtonProps) {
  const {
    isAnswered,
    isRight, //
    onClick,
    children,
  } = props;
  return (
    <button
      className="quiz__game-answer"
      style={{
        backgroundColor: isAnswered ? (isRight ? '#5ffbad89' : '#f17c7c89') : '#fbe8a6',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
