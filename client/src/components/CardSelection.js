import React, { useCallback } from 'react';
import css from './CardSelection.module.css';

const CardSelection = ({
  flashcards,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  set: { title, username } = { title: '<None>', username: '<None>' },
}) => {
  const handleSelect = useCallback((e) => {
    setCurrentFlashcardIndex(Number(e.target.value));
  }, []);

  return (
    <div className={css.container}>
      <div className={css.setInfo}>
        <div className={css.title}>Current set: {title}</div>
        <div className={css.subtitle}>
          Owned by: <strong>{username}</strong>
        </div>
      </div>
      <select
        className={css.selection}
        onChange={handleSelect}
        value={currentFlashcardIndex}
      >
        {flashcards
          ? flashcards.map((card, i) => (
              <option key={card.id} value={i} className={css.option}>
                {`${i + 1}: ${card.front}`}
              </option>
            ))
          : []}
      </select>
    </div>
  );
};

export default CardSelection;
