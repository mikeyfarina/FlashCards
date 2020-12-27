import React from "react";
import Set from "./Set";

const SetList = ({
  flashcards,
  flashcardSets,
  currentSet,
  setCurrentSet,
  setFlashcardSets,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  setDisplayingFront,
}) => {
  return (
    <ul className="sidebar__setlist">
      {flashcardSets.map((set, i) => (
        <li key={set.id} className={i === currentSet ? "current-set" : ""}>
          <Set
            flashcards={flashcards}
            set={set}
            setNumber={i}
            setCurrentSet={setCurrentSet}
            currentSet={currentSet}
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            currentFlashcardIndex={currentFlashcardIndex}
            setCurrentFlashcardIndex={setCurrentFlashcardIndex}
            setDisplayingFront={setDisplayingFront}
          />
        </li>
      ))}
    </ul>
  );
};

export default SetList;
