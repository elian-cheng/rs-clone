import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DropResult } from 'react-beautiful-dnd';

const answersOptions = [
  { id: '1', content: 'number' },
  { id: '2', content: 'string' },
  { id: '3', content: 'boolean' },
];

export default function AnswerOptionsBar() {
  const [options, updateOptions] = useState(answersOptions);
  const [point, setPoint] = useState(false);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateOptions(items);
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={'options'} key={'options'} direction="horizontal">
        {(provided, snapshot) => {
          snapshot.isDraggingOver ? setPoint(true) : setPoint(false);
          return (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="missing-type__answers-options-list"
            >
              {options.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => {
                      return (
                        <li
                          className="missing-type__answers-options-list-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.content}
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
              {point || snapshot.isDraggingOver ? (
                <div className="missing-type__point">You can drop it here:)</div>
              ) : null}
              <code className="missing-type__question-code">
                {`function printCoord(pt: { x: number; y: number }) {
              console.log("The coordinate's x value is " + pt.x);
              console.log("The coordinate's y value is " + pt.y);
            }`}
              </code>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
