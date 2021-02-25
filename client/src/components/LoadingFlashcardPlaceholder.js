import React from 'react';
import cn from 'classnames';
import Flashcard from './Flashcard.module.css';
import css from './LoadingFlashcardPlaceholder.module.css';

const LoadingFlashcardPlaceholder = ({ mousePosition, transition }) => {
  const cardStyles = {
    transform: `rotateY(${
      mousePosition ? mousePosition.xAxis : 0
    }deg) rotateX(${mousePosition ? mousePosition.yAxis : 0}deg)`,
    transition,
  };

  return (
    <div className={cn(Flashcard.card, css.container)} style={cardStyles}>
      <div className={css.scanner} />
    </div>
  );
};

export default LoadingFlashcardPlaceholder;
