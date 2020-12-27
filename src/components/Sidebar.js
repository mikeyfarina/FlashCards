import React from 'react';

import SetList from './SetList';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({
  flashcards,
  setFlashcards,
  flashcardSets,
  setFlashcardSets,
  currentSet,
  setCurrentSet,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  displayingFront,
  setDisplayingFront,
}) => {
  return (
    <div className="sidebar">
      <SidebarHeader
        flashcardSets={flashcardSets}
        currentSet={currentSet}
        setFlashcardSets={setFlashcardSets}
      />
      <SetList
        flashcards={flashcards}
        setFlashcards={setFlashcards}
        currentSet={currentSet}
        setCurrentSet={setCurrentSet}
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
        currentFlashcardIndex={currentFlashcardIndex}
        setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        displayingFront={displayingFront}
        setDisplayingFront={setDisplayingFront}
      />
      <div className="sidebar__bottom"></div>
    </div>
  );
};

export default Sidebar;
