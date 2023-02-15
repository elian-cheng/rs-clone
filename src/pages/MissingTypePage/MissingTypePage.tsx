import React, { useEffect, useState } from 'react';
import MissingTypeStartPage from './components/MissingTypeStartPage/MissingTypeStartPage';
import MissingTypeTask from './components/MissingTypeTask';
import { getMissingType } from '../../API/tasks';
export interface IMissingTypeTasks {
  id: number;
  question: string;
  options: string[];
  answer: string;
}
export default function MissingTypePage() {
  const [startStatus, setStartStatus] = useState(false);
  const [tasks, updateTask] = useState<IMissingTypeTasks[] | undefined>(undefined);

  useEffect(() => {
    getMissingType().then((res: IMissingTypeTasks[]) => {
      updateTask(res);
    });
  }, [startStatus]);

  return (
    <article className="missing-type">
      {startStatus && tasks ? (
        <MissingTypeTask tasks={tasks} />
      ) : (
        <MissingTypeStartPage setStartStatus={setStartStatus} />
      )}
    </article>
  );
}
