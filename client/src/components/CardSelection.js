import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import css from './CardSelection.module.css';

const CardSelection = ({
  flashcards,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  set: { title, username } = { title: '<None>', username: '' },
  showSetInfo,
  onOwnSet,
}) => {
  const handleSelect = useCallback((e) => {
    setCurrentFlashcardIndex(Number(e.target.value));
  }, []);

  return (
    <div className={css.container}>
      <div className={cn(css.setInfo, { [css.hidden]: !showSetInfo })}>
        <div className={css.title}>Current set: {title}</div>
        <div className={css.subtitle}>
          Owned by:{' '}
          <Link to={`/users/${username}`}>{onOwnSet ? 'you' : username}</Link>
        </div>
      </div>
      {flashcards?.length > 0 && (
        <select
          className={cn(css.selection, { [css.hidden]: !showSetInfo })}
          onChange={handleSelect}
          value={currentFlashcardIndex}
        >
          {flashcards.map((card, i) => (
            <option key={card.id} value={i} className={css.option}>
              {`${i + 1}: ${card.front}`}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CardSelection;
