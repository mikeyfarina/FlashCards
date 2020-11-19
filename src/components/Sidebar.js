import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SetList from "./SetList";

const Sidebar = ({
  flashcardSets,
  setFlashcardSets,
  currentSet,
  setCurrentSet,
  newCardId,
  setNewCardId,
  currentFlashcard,
  setCurrentFlashcard,
  displayingFront,
  setDisplayingFront,
}) => {
  return (
    <div className="sidebar">
      <SidebarHeader
        flashcardSets={flashcardSets}
        currentSet={currentSet}
        setFlashcardSets={setFlashcardSets}
        newCardId={newCardId}
        setNewCardId={setNewCardId}
      />
      <SetList
        currentSet={currentSet}
        setCurrentSet={setCurrentSet}
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
        currentFlashcard={currentFlashcard}
        setCurrentFlashcard={setCurrentFlashcard}
        displayingFront={displayingFront}
        setDisplayingFront={setDisplayingFront}
      />
      <div className="sidebar__bottom"></div>
    </div>
  );
};

export default Sidebar;
