import React from 'react';
import Flashcard from './Flashcard.module.css';
import PlaceholderStyles from './LoadingFlashcardPlaceholder.module.css';

const LoadingFlashcardPlaceholder = ({ mousePosition, transition }) => {
  const cardStyles = {
    transform: `rotateY(${
      mousePosition ? mousePosition.xAxis : 0
    }deg) rotateX(${mousePosition ? mousePosition.yAxis : 0}deg)`,
    transition,
  };

  return (
    <div
      className={`${Flashcard.card} ${PlaceholderStyles.container}`}
      style={cardStyles}
    >
      <div className={PlaceholderStyles.scanner} />
    </div>
  );
};

export default LoadingFlashcardPlaceholder;
