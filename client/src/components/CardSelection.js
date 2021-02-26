import React, { useCallback } from 'react';
import css from './CardSelection.module.css';

const CardSelection = ({
  flashcards,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const handleSelect = useCallback((e) => {
    setCurrentFlashcardIndex(Number(e.target.value));
  }, []);

  return (
    <>
      <select
        className={css.selection}
        onChange={handleSelect}
        value={currentFlashcardIndex}
      >
        {flashcards
          ? flashcards.map((card, i) => (
              <option key={Math.random(35) * 6} value={i}>
                {`${i + 1}: ${card.front}`}
              </option>
            ))
          : []}
      </select>
    </>
  );
};

export default CardSelection;
