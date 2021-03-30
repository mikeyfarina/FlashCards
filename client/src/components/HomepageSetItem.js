import React from 'react';
import { Link } from 'react-router-dom';
import css from './HomepageSetItem.module.css';

const HomepageSetItem = ({ card, indexOfCard, set, showAllFlashcards }) =>
  !(indexOfCard > 6 && !showAllFlashcards) && (
    <Link
      className={css.card}
      onClick={(e) => e.stopPropagation()}
      to={`/flashcards/${set.id}/${card.id}`}
    >
      {card.front}
    </Link>
  );

export default HomepageSetItem;
