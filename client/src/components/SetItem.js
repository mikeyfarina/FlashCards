import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import css from './SetItem.module.css';

const SetItem = ({
  card,
  indexOfCard,
  currentSet,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  setCurrentSetIndex,
  cardRefs,
  indexOfSet,
}) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(false);

  const handleCardClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!currentSet) {
        setCurrentSetIndex(indexOfSet);
      }

      setCurrentFlashcardIndex(indexOfCard);
    },
    [currentSet, indexOfCard]
  );

  useEffect(() => {
    setCurrentFlashcard(currentSet && currentFlashcardIndex === indexOfCard);
  }, [currentFlashcardIndex, indexOfCard, currentSet]);

  return (
    <div
      className={cn(css.card, {
        [css.current]: currentFlashcard,
        [css.currentSet]: currentSet,
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
