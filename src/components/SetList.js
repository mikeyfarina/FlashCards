import React, { useEffect, useState } from 'react';
import setService from '../services/setService';
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
  const [updatedFlashcardSets, setUpdatedFlashcardSets] = useState([]);

  useEffect(() => {
    Promise.all(getCurrentFlashcardSetsPromises()).then((sets) => {
      setUpdatedFlashcardSets(sets);
    });
  }, [currentSet, flashcards]);

  const getCurrentFlashcardSetsPromises = () => {
    return flashcardSets.map((set) => {
      return setService.getAllFlashcardsInSet(set.id).then((setFlashcards) => {
        const formattedSet = {
          title: set.title,
          flashcards: setFlashcards,
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
                flashcards={
                  set.id === flashcardSets[currentSet].id
                    ? flashcards
                    : set.flashcards
                }
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
