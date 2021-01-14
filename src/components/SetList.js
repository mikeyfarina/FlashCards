import React, { useEffect, useState } from 'react';
import setService from '../services/setService';
import Set from './Set';

const SetList = ({
  setFlashcards,
  flashcardSets,
  setFlashcardSets,
  currentSet,
  setCurrentSet,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const [updatedFlashcardSets, setUpdatedFlashcardSets] = useState([]);

  useEffect(() => {
    Promise.all(getCurrentFlashcardSets()).then((sets) => {
      setUpdatedFlashcardSets(sets);
      setFlashcards(sets[currentSet].flashcards);
    });
  }, [currentSet, flashcardSets]);

  const getCurrentFlashcardSets = () => {
    return flashcardSets.map((set) => {
      return setService.getAllFlashcardsInSet(set.id).then((setFcs) => {
        const formattedSet = {
          title: set.title,
          flashcards: setFcs,
          id: set.id,
        };
        return formattedSet;
      });
    });
  };

  return (
    <div>
      {!updatedFlashcardSets ? (
        <div>Loading Set List...</div>
      ) : (
        <ul className="sidebar__setlist">
          {updatedFlashcardSets.map((set, i) => (
            <li key={set.id} className={i === currentSet ? 'current-set' : ''}>
              <Set
                set={set}
                flashcards={set.flashcards}
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
