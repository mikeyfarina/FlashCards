import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import css from './SetItem.module.css';

const SetItem = ({
  card,
  indexOfCard,
  currentSet,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  cardRefs,
}) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(false);

  const handleCardClick = useCallback(() => {
    if (!currentSet) return;
    setCurrentFlashcardIndex(indexOfCard);
  }, [currentSet, indexOfCard]);

  useEffect(() => {
    setCurrentFlashcard(currentSet && currentFlashcardIndex === indexOfCard);
  }, [currentFlashcardIndex, indexOfCard, currentSet]);

  return (
    <div
      className={cn(css.card, {
        [css.current]: currentFlashcard,
      })}
      ref={(el) => {
        cardRefs.push(el);
      }}
      onClick={handleCardClick}
      role="button"
      tabIndex="0"
    >
      {card.front}
    </div>
  );
};

export default SetItem;
