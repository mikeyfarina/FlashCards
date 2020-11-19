import React, { useState } from "react";
import Set from "./Set";

const SetList = ({
  flashcardSets,
  currentSet,
  setCurrentSet,
  setFlashcardSets,
  currentFlashcard,
  setCurrentFlashcard,
  setDisplayingFront,
}) => {
  console.log(flashcardSets);

  return (
    <ul className="sidebar__setlist">
      {flashcardSets.map((set, i) => (
        <li key={set.id} className={i === currentSet ? "current-set" : ""}>
          <Set
            set={set}
            setNumber={i}
            setCurrentSet={setCurrentSet}
            currentSet={currentSet}
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            currentFlashcard={currentFlashcard}
            setCurrentFlashcard={setCurrentFlashcard}
            setDisplayingFront={setDisplayingFront}
          />
        </li>
      ))}
    </ul>
  );
};

export default SetList;
