import React, { useCallback } from 'react';
import css from './CardSelection.module.css';

const CardSelection = ({
  flashcards,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  set: { title } = { title: '<None>' },
}) => {
  const handleSelect = useCallback((e) => {
    setCurrentFlashcardIndex(Number(e.target.value));
  }, []);

  return (
    <div className={css.container}>
      <div className={css.text}>
        <div className={css.title}>Current set: {title}</div>
        <div className={css.subtitle}>Owned by you</div>
      </div>
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
    </div>
  );
};

export default CardSelection;
