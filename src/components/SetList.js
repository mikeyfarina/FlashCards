import React, { useEffect, useState } from 'react';
import Set from './Set';

const SetList = ({
  flashcards,
  flashcardSets,
  setFlashcardSets,
  currentSetIndex,
  setCurrentSetIndex,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  sidebarSearchText,
}) => {
  const [setListSets, setSetListSets] = useState(null);

  useEffect(() => {
    setSetListSets(flashcardSets);
  }, [flashcardSets]);

  useEffect(() => {
    if (sidebarSearchText === '') {
      console.log('search empty', flashcardSets);
      setSetListSets(flashcardSets);
    } else {
      const sets = flashcardSets
        .filter((set) => set.title.includes(sidebarSearchText, 0))
        .sort((a, b) => {
          console.log(a, b);
          return (
            a.title.indexOf(sidebarSearchText) -
            b.title.indexOf(sidebarSearchText)
          );
        });
      setSetListSets(sets);
    }
  }, [sidebarSearchText]);

  return (
    <div className="sidebar__setlist">
      {!setListSets ? (
        <div>Loading Set List...</div>
      ) : (
        <ul>
          {setListSets.map((set, i) => (
            <li
              key={set.id}
              className={
                setListSets[i] === flashcardSets[currentSetIndex]
                  ? 'current-set'
                  : ''
              }
            >
              <Set
                set={set}
                index={i}
                flashcards={flashcards}
                setCreator={set.username}
                currentSetIndex={currentSetIndex}
                setCurrentSetIndex={setCurrentSetIndex}
                flashcardSets={flashcardSets}
                setFlashcardSets={setFlashcardSets}
                currentFlashcardIndex={currentFlashcardIndex}
                setCurrentFlashcardIndex={setCurrentFlashcardIndex}
                sidebarSearchText={sidebarSearchText}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SetList;
