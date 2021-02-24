import React, { useEffect, useState } from 'react';
import SetListStyles from './SetList.module.css';
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

  useEffect(() => {
    setSetListSets(flashcardSets);
  }, [flashcardSets]);

  useEffect(() => {
    if (sidebarSearchText === '') {
      setSetListSets(flashcardSets);
    } else {
      const sets = flashcardSets
        .filter((set) => set.title.includes(sidebarSearchText, 0))
        .sort(
          (a, b) =>
            a.title.indexOf(sidebarSearchText) -
            b.title.indexOf(sidebarSearchText)
        );
      setSetListSets(sets);
    }
  }, [sidebarSearchText, flashcardSets]);

  return (
    <div className={SetListStyles.container}>
      {!setListSets ? (
        <div>Loading Set List...</div>
      ) : (
        <ul className={SetListStyles.sets}>
          {setListSets.map((set, i) => (
            <li key={set.id} className={SetListStyles.set}>
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
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SetList;
