import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { updateGameStatistics } from '../../../../API/statistics';
import { UserContext } from '../../../../context/UserContext';
import { GameStatus, IAnswers } from '../../../QuizPage/QuizPage';
import { IMissingTypeTask } from '../../MissingTypePage';

export default function MissingTypeCheckBtn({
  answers,
  setAnswers,
  answer,
  task,
  taskIndex,
  setStatus,
  setTaskIndex,
  maxTasks,
}: {
  answer: string | undefined;
  task: IMissingTypeTask;
  taskIndex: number;
  maxTasks: number;
  answers: IAnswers;
  setStatus: Dispatch<SetStateAction<number>>;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  setTaskIndex: Dispatch<SetStateAction<number>>;
}) {
  const { user } = useContext(UserContext);

  function nextTask() {
    if (taskIndex < maxTasks - 1) {
      setTaskIndex((taskIndex) => taskIndex + 1);
    }
    if (taskIndex < maxTasks) {
      if (answer === task.answer) {
        setAnswers((prev) => ({
          ...prev,
          ...{
            right: prev.right + 1,
            strike: prev.strike + 1,
          },
        }));
      } else {
        setAnswers((prev) => ({
          ...prev,
          ...{
            wrong: prev.wrong + 1,
            max: prev.max < prev.strike ? prev.strike : prev.max,
            strike: 0,
          },
        }));
      }
    }
  }
  function finishTask() {
    nextTask();
    setStatus(GameStatus.RESULT);
  }

  // useEffect(() => {
  //   finishStatus && user ? updateGameStatistics({ answers, gameType: 'missingType' }) : null;
  // }, [finishStatus]);

  return taskIndex === maxTasks - 1 ? (
    <button
      className={`missing-type__btn ${answer != '_____?' ? 'missing-type__btn_active' : ''}`}
      onClick={finishTask}
    >
      Finish
    </button>
  ) : (
    <button
      className={`missing-type__btn ${answer != '_____?' ? 'missing-type__btn_active' : ''}`}
      onClick={nextTask}
    >
      Next
    </button>
  );
}
