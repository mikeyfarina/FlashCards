import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cn from 'classnames';
import css from './HomepageSet.module.css';

const HomepageSet = ({ set }) => {
  const [showAllFlashcards, setShowAllflashcards] = useState(false);
  const history = useHistory();

  const handleShowMoreOptions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAllflashcards(!showAllFlashcards);
  };

  return (
    <div
      className={css.container}
      onClick={() => {
        history.push(`/flashcards/${set.id}`);
      }}
      role="button"
      tabIndex="0"
    >
      <h2 className={css.title}>{set.title}</h2>
      <div className={cn(css.cards, { [css.showing]: showAllFlashcards })}>
        {set.flashcards.map(
          (card, i) =>
            !(i > 3 && !showAllFlashcards) && (
              <div
                key={card.id}
                className={css.card}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/flashcards/${set.id}/${card.id}`);
                }}
                role="link"
                tabIndex="0"
              >
                <h5>{card.front}</h5>
              </div>
            )
        )}
      </div>
      {set.flashcards.length > 3 && (
        <div
          className={css.ellipsis}
          onClick={handleShowMoreOptions}
          role="button"
          tabIndex="0"
        >
          ...
        </div>
      )}
      <h5 className={css.size}>
        Size: <strong>{set.flashcards.length || 0}</strong>
      </h5>
      <h5 className={css.author}>
        Created By:{' '}
        <Link
          to={`/users/${set.username}`}
          className={css.user}
          onClick={(e) => e.stopPropagation()}
        >
          <strong>{set.username}</strong>
        </Link>
      </h5>
    </div>
  );
};

export default HomepageSet;
