import React from 'react';

const LoadingFlashcardPlaceholder = ({ mousePosition, transition }) => {
  const cardStyles = {
    transform: `rotateY(${
      mousePosition ? mousePosition.xAxis : 0
    }deg) rotateX(${mousePosition ? mousePosition.yAxis : 0}deg)`,
    transition: transition,
    padding: '3%',
    overflow: 'hidden',
  };

  const scannerStyles = {
    background: 'white',
    height: '90%',
    color: 'rgba(1, 1, 1, 0.2)',
    borderRadius: '15px',
    maxWidth: '1px',
    marginLeft: ' 0',
    boxShadow:
      'rgba(1, 1, 1, 0.3) 0px 0px 70px 17px, rgba(1,1,1,.1) 0px 0px 50px 10px',
    transform: 'translateZ(45px)',
    position: 'absolute',
  };

  return (
    <div className="flashcard" style={cardStyles}>
      <div className="scanner" style={scannerStyles}></div>
    </div>
  );
};

export default LoadingFlashcardPlaceholder;
