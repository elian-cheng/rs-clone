import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { updateGameStatistics } from '../../../../API/statistics';
import storage from '../../../../utils/storage';
import { GameStatus, IAnswers } from '../../../QuizPage/QuizPage';
import { IMissingTypeTask } from '../../MissingTypePage';

export default function MissingTypeCheckBtn({
  answers,
  answer,
  task,
  taskIndex,
  maxTasks,
  setStatus,
  setAnswers,
  setTaskIndex,
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
  const user = storage.getItem('userData');
  const [finish, setFinish] = useState(false);
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
    setFinish(true);
  }

  useEffect(() => {
    finish && user ? updateGameStatistics({ answers, gameType: 'missingType' }) : null;
    finish ? setStatus(GameStatus.RESULT) : null;
  }, [finish]);

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
