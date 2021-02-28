import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import css from './HomepageSetItem.module.css';

const HomepageSetItem = ({ card, indexOfCard, set, showAllFlashcards }) => {
  const history = useHistory();
  const viewCard = useCallback(
    (e) => {
      e.stopPropagation();
      history.push(`/flashcards/${set.id}/${card.id}`);
    },
    [history]
  );

  return (
    !(indexOfCard > 3 && !showAllFlashcards) && (
      <div className={css.card} onClick={viewCard} role="link" tabIndex="0">
        <h5>{card.front}</h5>
      </div>
    )
  );
};

export default HomepageSetItem;
