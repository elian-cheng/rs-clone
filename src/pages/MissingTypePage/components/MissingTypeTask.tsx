import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DropResult } from 'react-beautiful-dnd';
import MissingTypeCheckBtn from './MissingTypeCheckBtn/MissingTypeCheckBtn';
import { IMissingTypeTasks } from '../MissingTypePage';

export default function MissingTypeTask({ tasks }: { tasks: IMissingTypeTasks[] }) {
  const [taskIndex, updateTaskIndex] = useState(0);
  const [task, updateTask] = useState(tasks[taskIndex]);
  const [answer, updateAnswer] = useState('_____?');

  useEffect(() => {
    if (taskIndex < tasks.length) {
      updateTask(tasks[taskIndex]);
      updateAnswer('_____?');
    } else {
      console.log('end');
    }
  }, [taskIndex]);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) {
      updateAnswer(result.draggableId);
    }
  }

  return (
    <>
      <h2 className="missing-type__question-count">
        Question {`${taskIndex < tasks.length ? taskIndex + 1 : taskIndex} / ${tasks.length}`}
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
        answer={answer}
        task={task}
        updateTaskIndex={updateTaskIndex}
        taskIndex={taskIndex}
        maxTasks={tasks.length}
      />
    </>
  );
}
