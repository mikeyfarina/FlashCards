import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import HomeSetStyles from './HomepageSet.module.css';

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
      className={`${HomeSetStyles.container}`}
      onClick={() => {
        history.push(`/flashcards/${set.id}`);
      }}
      role="button"
      tabIndex="0"
    >
      <h2 className={HomeSetStyles.title}>{set.title}</h2>
      <div
        className={HomeSetStyles.cards}
        style={{
          height: showAllFlashcards ? '65%' : '50%',
        }}
      >
        {set.flashcards.map(
          (card, i) =>
            !(i > 3 && !showAllFlashcards) && (
              <div
                key={card.id}
                className={HomeSetStyles.card}
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
          className={HomeSetStyles.ellipsis}
          onClick={handleShowMoreOptions}
          role="button"
          tabIndex="0"
        >
          ...
        </div>
      )}
      <h5 className={HomeSetStyles.size}>
        Size:
        <strong>{` ${set.flashcards.length || 0}`}</strong>
      </h5>
      <h5 className={HomeSetStyles.author}>
        Created By:
        <Link
          to={`/users/${set.username}`}
          className={HomeSetStyles.user}
          onClick={(e) => e.stopPropagation()}
        >
          <strong>{` ${set.username}`}</strong>
        </Link>
      </h5>
    </div>
  );
};

export default HomepageSet;
