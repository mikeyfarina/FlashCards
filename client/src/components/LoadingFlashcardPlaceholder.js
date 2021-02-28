import React, { useMemo } from 'react';
import cn from 'classnames';
import Flashcard from './Flashcard.module.css';
import css from './LoadingFlashcardPlaceholder.module.css';

const LoadingFlashcardPlaceholder = ({ mousePosition }) => {
  const cardStyles = useMemo(() => {
    const rotateY = mousePosition ? mousePosition.xAxis : 0;
    const rotateX = mousePosition ? mousePosition.yAxis : 0;
    return {
      transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
    };
  }, [mousePosition.xAxis, mousePosition.yAxis]);

  return (
    <div className={cn(Flashcard.card, css.container)} style={cardStyles}>
      <div className={css.scanner} />
    </div>
  );
};

export default LoadingFlashcardPlaceholder;
