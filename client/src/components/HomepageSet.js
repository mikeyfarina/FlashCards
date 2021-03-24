import React, { useCallback, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cn from 'classnames';
import css from './HomepageSet.module.css';
import ui from '../styles/UserListItem.module.css';
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
    <div
      className={cn(css.container, ui.item)}
      onClick={viewSet}
      role="button"
      tabIndex="0"
    >
      <h2 className={css.title}>{set.title}</h2>
      <div>
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

      {!showAllFlashcards && set.flashcards.length > 3 && (
        <button
          className={css.more}
          onClick={handleShowMoreOptions}
          type="button"
        >
          Click for more
        </button>
      )}

      <div className={css.size}>
        Size: <strong>{set.flashcards.length || 0}</strong>
      </div>

      <div>
        Created By:{' '}
        <Link
          to={`/users/${set.username}`}
          className={css.user}
          onClick={(e) => e.stopPropagation()}
        >
          <strong>{set.username}</strong>
        </Link>
      </div>
    </div>
  );
};

export default HomepageSet;
