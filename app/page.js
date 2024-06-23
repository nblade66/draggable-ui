// pages/MyPage.js
'use client';

import React, { useState } from 'react';
import DraggableList from '../components/DraggableList';

const initialPlaces = [
  { id: '1', name: 'Item 1', location: 'Location 1', image: "/1.jpg" },
  { id: '2', name: 'Item 2', location: 'Location 2', image: "/2.jpg" },
  { id: '3', name: 'Item 3', location: 'Sydney, Australiaoua', image: "/3.jpg" },
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const MyPage = () => {
  const [places, setPlaces] = useState(initialPlaces);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      places,
      result.source.index,
      result.destination.index
    );

    setPlaces(newItems);
  };

  return (
    <div>
      <DraggableList items={places} onDragEnd={onDragEnd} />
    </div>
  );
};

export default MyPage;