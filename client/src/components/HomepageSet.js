import React, { useCallback, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cn from 'classnames';
import css from './HomepageSet.module.css';
import HomepageSetItem from './HomepageSetItem';

const HomepageSet = ({ set }) => {
  const [showAllFlashcards, setShowAllflashcards] = useState(false);
  const history = useHistory();

  const handleShowMoreOptions = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setShowAllflashcards(!showAllFlashcards);
    },
    [showAllFlashcards]
  );

  const viewSet = useCallback(() => {
    history.push(`/flashcards/${set.id}`);
  }, [history]);

  return (
    <div className={css.container} onClick={viewSet} role="button" tabIndex="0">
      <h2 className={css.title}>{set.title}</h2>
      <div className={cn(css.cards, { [css.showing]: showAllFlashcards })}>
        {set.flashcards.map((card, indexOfCard) => (
          <HomepageSetItem
            key={card.id}
            card={card}
            indexOfCard={indexOfCard}
            set={set}
            showAllFlashcards={showAllFlashcards}
          />
        ))}
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
