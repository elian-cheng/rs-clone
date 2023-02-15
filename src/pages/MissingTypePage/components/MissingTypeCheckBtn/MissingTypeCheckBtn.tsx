import { Dispatch, SetStateAction } from 'react';
import { IMissingTypeTasks } from '../../MissingTypePage';

export default function MissingTypeCheckBtn({
  answer,
  task,
  taskIndex,
  updateTaskIndex,
  maxTasks,
}: {
  answer: string | undefined;
  task: IMissingTypeTasks;
  taskIndex: number;
  maxTasks: number;
  updateTaskIndex: Dispatch<SetStateAction<number>>;
}) {
  function nextTask() {
    if (taskIndex < maxTasks - 1) {
      updateTaskIndex(taskIndex + 1);
    }
  }
  return (
    <button
      className={`missing-type__btn ${answer != '_____?' ? 'missing-type__btn_active' : ''}`}
      onClick={nextTask}
    >
      {taskIndex === maxTasks - 1 ? 'Finish' : 'Check && Next'}
      <p style={{ color: 'red' }}>{answer === task.answer ? 'true' : 'false'}</p>
    </button>
  );
}
