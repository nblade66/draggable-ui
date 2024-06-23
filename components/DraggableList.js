import React from 'react';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable, Placeholder } from '@hello-pangea/dnd';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 16,
  margin: '0 0 8px 0',
  background: isDragging ? 'rgba(0, 0, 0, 0.1)' : 'lightgrey',
  filter: isDragging ? 'grayscale(100%)' : 'none',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: 8,
  width: '100%',
});

const DraggableItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="flex items-center w-full"
        >
          <div className="w-12 h-12 overflow-hidden rounded-md">
            <Image
              src={item.image}
              width={48}
              height={48}
              alt="Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-4 w-full">
            <span className="block text-lg">{item.name}</span>
            <span className="block w-full truncate">{item.location}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const DraggableList = ({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <DraggableItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
            {snapshot.isDraggingOver && (
              <div className="h-px bg-blue-500"></div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;