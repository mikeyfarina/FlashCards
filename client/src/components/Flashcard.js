import React, { useEffect, useRef, useState } from 'react';

import flashcardService from '../services/flashcardService';
import LoadingFlashcardPlaceholder from './LoadingFlashcardPlaceholder';

const Flashcard = ({
  flashcards,
  setFlashcards,
  currentFlashcardIndex, // index
  canEdit,
}) => {
  const [mousePosition, setMousePosition] = useState({
    xAxis: 0,
    yAxis: 0,
  });
  const [transition, setTransition] = useState('none');
  const [flashcard, setFlashcard] = useState(null);
  const [flashcardInputText, setFlashcardInputText] = useState('');
  const [displayingFront, setDisplayingFront] = useState(true);
  const [flip, setFlip] = useState(false);

  const divStyle = {
    transform: `rotateY(${!flip ? mousePosition.xAxis - 5 : 0}deg) rotateX(${
      displayingFront
        ? 180 - -mousePosition.yAxis + 5
        : (mousePosition.yAxis + 5) * 1.5
    }deg)`,
    WebkitTransform: `rotateY(${
      !flip ? mousePosition.xAxis - 5 : 0
    }deg) rotateX(${
      displayingFront
        ? 180 - -mousePosition.yAxis + 5
        : (mousePosition.yAxis + 5) * 1.5
    }deg)`,
    MozTransform: `rotateY(${!flip ? mousePosition.xAxis - 5 : 0}deg) rotateX(${
      displayingFront
        ? 180 - -mousePosition.yAxis + 5
        : (mousePosition.yAxis + 5) * 1.5
    }deg)`,
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    MozTransformStyle: 'preserve-3d',
    transition: transition,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  };

  const frontStyles = {
    transform: 'rotateY(0deg) rotateX(180deg)',
    WebkitTransform: 'rotateY(0deg) rotateX(180deg)',
    MozTransform: 'rotateY(0deg) rotateX(180deg)',
    transition: transition,
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    MozTransformStyle: 'preserve-3d',
    height: '100%',
    width: '100%',
    position: 'absolute',
    padding: '2% 3%',
  };

  const backStyles = {
    transform: 'rotateY(0deg) rotateX(0deg)',
    WebkitTransform: 'rotateY(0deg) rotateX(0deg)',
    MozTransform: 'rotateY(0deg) rotateX(0deg)',
    transition: transition,
    transformStyle: 'preserve-3d',
    WebkitTransformStyle: 'preserve-3d',
    MozTransformStyle: 'preserve-3d',
    height: '100%',
    width: '100%',
    position: 'absolute',
  };

  useEffect(() => {
    const newFlashcard = flashcards[currentFlashcardIndex];
    setFlashcard(newFlashcard);
    setDisplayingFront(true);
    setFlashcard(flashcards[currentFlashcardIndex] || null);
  }, [currentFlashcardIndex, flashcards]);

  const firstLoad = useRef(true);
  useEffect(() => {
    //dont save flashcard on first load
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    //if switching from edit mode to non-edit mode, save
    if (!canEdit) {
      updateAndSaveFlashcard();
    }
  }, [canEdit]);

  useEffect(() => {
    if (flip) {
      setTransition('all .5s ease-out');
    }
  }, [flip]);

  const handleMouseMove = (e) => {
    if (!flip) {
      let xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
      let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      setMousePosition({ xAxis, yAxis });
    }
  };

  const handleMouseEnter = () => {
    setTransition('transform .5s ease-out');
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleMouseLeave = () => {
    //console.log('reset', e);
    setTransition('transform .5s ease-out');
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleClick = () => {
    if (!canEdit) {
      //if not in edit mode, flip card
      //flip {displayingFront} to display back
      setDisplayingFront(!displayingFront);
      setTransition('all .5s linear');
      setFlip(true);
      setTimeout(() => {
        setFlip(false);
      }, 500);
    }
  };

  const handleTextEdit = (e) => {
    if (canEdit) {
      setFlashcardInputText(e.target.value);
      displayingFront
        ? setFlashcard({ ...flashcard, front: e.target.value })
        : setFlashcard({ ...flashcard, back: e.target.value });
    }
  };

  const updateAndSaveFlashcard = () => {
    const flashcardToUpdate = flashcards[currentFlashcardIndex];
    const updatedFlashcard = displayingFront
      ? {
          ...flashcardToUpdate,
          front: flashcardInputText || flashcardToUpdate.front,
        }
      : {
          ...flashcardToUpdate,
          back: flashcardInputText || flashcardToUpdate.back,
        };
    flashcardService
      .updateFlashcard(flashcardToUpdate.id, updatedFlashcard)
      .then((updatedFlashcard) => {
        setFlashcards(
          flashcards.map((card) =>
            card.id !== flashcardToUpdate.id ? card : updatedFlashcard
          )
        );
      })
      .catch((er) => {
        console.error(er);
        setFlashcard(flashcardToUpdate);
      })
      .then(() => {
        setFlashcardInputText('');
      });
  };

  const backTextRef = useRef();
  const frontTextRef = useRef();
  useEffect(() => {
    if (!canEdit) return;
    console.log(backTextRef, frontTextRef);
    if (canEdit && displayingFront) {
      frontTextRef.current.focus();
    }
    if (canEdit && !displayingFront) {
      backTextRef.current.focus();
    }
  }, [canEdit]);

  return (
    <div
      className={'flashcard-container'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {!flashcard ? (
        <LoadingFlashcardPlaceholder
          mousePosition={mousePosition}
          transition={transition}
        />
      ) : (
        <div className="flashcard" onClick={handleClick} style={divStyle}>
          <div className="flashcard__front" style={frontStyles}>
            <span className="card-number noselect">
              {Number.parseInt(currentFlashcardIndex) + 1}
            </span>
            <div className="flex-centering noselect">
              <textarea
                type="text"
                className={
                  canEdit
                    ? 'can-edit flashcard-text'
                    : 'flashcard-text noselect'
                }
                ref={frontTextRef}
                disabled={!canEdit}
                value={flashcard.front}
                onChange={handleTextEdit}
              ></textarea>
            </div>
          </div>
          <div
            className="flashcard__back"
            onClick={handleClick}
            style={backStyles}
          >
            <div className="flex-centering noselect">
              <textarea
                type="text"
                className={
                  canEdit ? 'flashcard-text' : 'flashcard-text noselect'
                }
                ref={backTextRef}
                disabled={!canEdit}
                value={flashcard.back}
                onChange={handleTextEdit}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
