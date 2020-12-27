import React, { useState } from 'react';

import Button from './Button';
import Form from './Form';

const SidebarHeader = ({ currentSet, flashcardSets, setFlashcardSets }) => {
  const [sidebarSearchText, setSidebarSearchText] = useState('');
  const [newSetId, setNewSetId] = useState(1);

  //TODO: FIX THIS
  const handleNewSet = () => {
    const newSet = {
      id: newSetId,
      title: 'new set ' + newSetId,
      flashcards: [
        {
          id: Math.random(100) * 5,
          front: 'new card',
          back: 'new card',
        },
      ],
    };
    setNewSetId(newSetId + 1);
    setFlashcardSets(flashcardSets.concat(newSet));
  };

  return (
    <div className="sidebar__header">
      {currentSet}
      <Button text={'+'} className={'new-set-button'} onClick={handleNewSet} />
      <Form
        className="search-bar"
        inputText={sidebarSearchText}
        setInputText={setSidebarSearchText}
      />
    </div>
  );
};

export default SidebarHeader;
