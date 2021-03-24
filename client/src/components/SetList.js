import React, { useEffect, useState } from 'react';
import css from './SetList.module.css';
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
  loggedInUser,
}) => {
  const [setListSets, setSetListSets] = useState(null);
  const [currentSetId, setCurrentSetId] = useState(null);

  useEffect(() => {
    setCurrentSetId(flashcardSets ? flashcardSets[currentSetIndex].id : null);
  }, [flashcardSets, currentSetIndex]);

  useEffect(() => {
    setSetListSets(flashcardSets);
  }, [flashcardSets, sidebarSearchText]);

  useEffect(() => {
    if (sidebarSearchText === '') {
      setSetListSets(flashcardSets);
    } else {
      const text = sidebarSearchText.toLowerCase();
      const sets = flashcardSets
        .filter((set) => set.title.toLowerCase().includes(text))
        .sort(
          (a, b) =>
            a.title.toLowerCase().indexOf(text) -
            b.title.toLowerCase().indexOf(text)
        );
      setSetListSets(sets);
    }
  }, [sidebarSearchText, flashcardSets]);

  return (
    <div className={css.container}>
      {!setListSets ? (
        <div>Loading Set List...</div>
      ) : (
        <ul className={css.sets}>
          {setListSets.map((set, i) => (
            <li key={set.id} className={css.set}>
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
                loggedInUser={loggedInUser}
                currentSetId={currentSetId}
                setCurrentSetId={setCurrentSetId}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SetList;
