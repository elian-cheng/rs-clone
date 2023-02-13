import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DropResult } from 'react-beautiful-dnd';
import MissingTypeCheckBtn from './MissingTypeCheckBtn/MissingTypeCheckBtn';

const answersOptions = ['number', 'string', 'boolean'];

const task = `function printCoord(pt: { x: _____?; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}`;

const trueAnswer = 'number';

export default function MissingTypeTask() {
  const [options, updateOptions] = useState(answersOptions);
  const [answer, updateAnswer] = useState('_____?');

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (result.source.droppableId !== result.destination.droppableId) {
      updateAnswer(result.draggableId);
    } else {
      const items = Array.from(options);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      updateOptions(items);
    }
  }
  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={'options'} key={'options'} direction="horizontal">
          {(provided) => {
            return (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="missing-type__answers-options-list"
              >
                {options.map((item, index) => {
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
                    __html: task.replace(new RegExp('_____\\?', 'ig'), `<span>${answer}</span>`),
                  }}
                />
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <MissingTypeCheckBtn answer={answer} trueAnswer={trueAnswer} />
    </>
  );
}
