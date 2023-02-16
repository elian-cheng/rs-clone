import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DropResult } from 'react-beautiful-dnd';
import MissingTypeCheckBtn from './MissingTypeCheckBtn/MissingTypeCheckBtn';
import { IMissingTypeTask } from '../MissingTypePage';
import { getMissingType } from '../../../API/tasks';
import { IAnswers } from '../../QuizPage/QuizPage';

export default function MissingTypeTask({
  answers,
  tasks,
  setTasks,
  setAnswers,
  setStatus,
}: {
  answers: IAnswers;
  tasks: IMissingTypeTask[];
  setTasks: Dispatch<SetStateAction<IMissingTypeTask[]>>;
  setAnswers: Dispatch<SetStateAction<IAnswers>>;
  setStatus: Dispatch<SetStateAction<number>>;
}) {
  const [taskIndex, setTaskIndex] = useState(0);
  const [task, setTask] = useState(tasks[taskIndex]);
  const [answer, setAnswer] = useState('_____?');

  useEffect(() => {
    getMissingType().then((res: IMissingTypeTask[]) => {
      setTasks(res);
    });
  }, []);

  useEffect(() => {
    setTask(tasks[taskIndex]);
    setAnswer('_____?');
  }, [tasks, taskIndex]);

  let currentPage = taskIndex;

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) {
      setAnswer(result.draggableId);
    }
  }
  return task ? (
    <>
      <h2 className="missing-type__question-count">
        Question{' '}
        {`${currentPage === tasks.length ? currentPage : currentPage + 1} / ${tasks.length}`}
      </h2>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'options'} key={'options'} direction="horizontal">
          {(provided) => {
            return (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="missing-type__answers-options-list"
              >
                {task.options.map((item, index) => {
                  return (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <li
                            className={`missing-type__answers-options-list-item ${
                              snapshot.isDragging
                                ? 'missing-type__answers-options-list-item_dragging'
                                : ''
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item}
                          </li>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
        <Droppable droppableId={'answer'} key={'naswer'} direction="horizontal">
          {(provided, snapshot) => {
            return (
              <div
                className="missing-type__question"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {snapshot.isDraggingOver ? (
                  <div className="missing-type__point">You can drop it here:)</div>
                ) : null}
                <code
                  className="missing-type__question-code"
                  dangerouslySetInnerHTML={{
                    __html: task.question.replace(
                      new RegExp('_{1,}\\?', 'ig'),
                      `<span>${answer}</span>`
                    ),
                  }}
                />
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <MissingTypeCheckBtn
        answers={answers}
        answer={answer}
        task={task}
        taskIndex={taskIndex}
        maxTasks={tasks.length}
        setAnswers={setAnswers}
        setTaskIndex={setTaskIndex}
        setStatus={setStatus}
      />
    </>
  ) : (
    <div>loading</div>
  );
}
