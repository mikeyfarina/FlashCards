import React from 'react';
import Set from './Set';

const SetList = ({
  flashcards,
  flashcardSets,
  setFlashcardSets,
  currentSet,
  setCurrentSet,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  return (
    <div>
      {!flashcardSets ? (
        <div>Loading Set List...</div>
      ) : (
        <ul className="sidebar__setlist">
          {flashcardSets.map((set, i) => (
            <li key={set.id} className={i === currentSet ? 'current-set' : ''}>
              <Set
                set={set}
                flashcards={currentSet === i ? flashcards : set.flashcards}
                index={i}
                setCreator={set.username}
                currentSet={currentSet}
                setCurrentSet={setCurrentSet}
                flashcardSets={flashcardSets}
                setFlashcardSets={setFlashcardSets}
                currentFlashcardIndex={currentFlashcardIndex}
                setCurrentFlashcardIndex={setCurrentFlashcardIndex}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SetList;
