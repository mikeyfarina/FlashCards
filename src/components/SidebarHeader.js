import React, { useState } from 'react';
import Form from './Form';
import Button from './Button';

const SidebarHeader = ({
  currentSet,
  flashcardSets,
  setFlashcardSets,
  newCardId,
  setNewCardId,
}) => {
  const [sidebarSearchText, setSidebarSearchText] = useState('');
  const [newSetId, setNewSetId] = useState(1);
  const handleNewSet = () => {
    const newSet = {
      id: newSetId,
      title: 'new set ' + newSetId,
      flashcards: [
        {
          id: newCardId,
          front: 'new card',
          back: 'new card',
        },
      ],
    };
    setNewCardId(newCardId + 1);
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
