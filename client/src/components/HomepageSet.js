import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const HomepageSet = ({ set }) => {
  const [showAllFlashcards, setShowAllflashcards] = useState(false);
  const history = useHistory();

  const setStyle = {
    float: 'left',
    background: 'white',
    zIndex: '1',
    padding: '1% 2%',
    borderRadius: '8px',
    boxShadow: '2px 5px 12px rgb(1, 1, 1, 0.2), 2px 5px 2px rgb(1, 1, 1, 0.1)',
    transition: 'all .1s linear',
    position: 'relative',
    scrollSnapAlign: 'start',
    scrollMarginTop: '2.5vh',
    scrollPadding: '8vh',
    willChange: 'transform',
  };

  const handleShowMoreOptions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAllflashcards(!showAllFlashcards);
  };

  return (
    <div
      className={'user-list-item home-set'}
      style={setStyle}
      onClick={() => {
        history.push(`/flashcards/${set.id}`);
      }}
    >
      <h2
        style={{
          marginBottom: '1vh',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {set.title}
      </h2>
      <div
        style={{
          overflow: 'scroll',
          height: showAllFlashcards ? '65%' : '50%',
          transition: 'height .2s ease-out',
        }}
      >
        {set.flashcards.map((card, i) => {
          if (i > 3 && !showAllFlashcards) return;
          return (
            <div
              key={card.id}
              style={{
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '1',
                overflow: 'hidden',
                display: '-webkit-box',
                maxWidth: '80%',
                padding: '.5%',
              }}
              className={'home-flashcard-option'}
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/flashcards/${set.id}/${card.id}`);
              }}
            >
              <h5>{card.front}</h5>
            </div>
          );
        })}
      </div>
      {set.flashcards.length > 3 && (
        <h5 className={'show-more-options'} onClick={handleShowMoreOptions}>
          ...
        </h5>
      )}
      <h5
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '4%',
          color: 'darkgray',
          fontWeight: 'lighter',
        }}
      >
        Size: <strong>{set.flashcards.length || 0}</strong>
      </h5>
      <h5
        style={{
          position: 'absolute',
          bottom: '6%',
          right: '4%',
          color: 'darkgray',
          fontWeight: 'lighter',
        }}
      >
        Created By:{' '}
        <Link
          to={`/users/${set.username}`}
          className={'user-link-from-set'}
          onClick={(e) => e.stopPropagation()}
        >
          <strong>{set.username}</strong>
        </Link>
      </h5>
    </div>
  );
};

export default HomepageSet;
