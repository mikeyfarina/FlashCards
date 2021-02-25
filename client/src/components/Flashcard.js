import React, { useEffect, useRef, useState } from 'react';
import CardStyles from './Flashcard.module.css';
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

  //create useMouse

  // const {handleMouseEvents, mousePosition } = useMousePosition()

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
    transition,
  };

  useEffect(() => {
    const newFlashcard = flashcards[currentFlashcardIndex];
    setFlashcard(newFlashcard);
    setDisplayingFront(true);
    setFlashcard(flashcards[currentFlashcardIndex] || null);
  }, [currentFlashcardIndex, flashcards]);

  useEffect(() => {
    if (flip) {
      setTransition('all .5s ease-out');
    }
  }, [flip]);

  const handleMouseMove = (e) => {
    if (!flip) {
      const xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      setMousePosition({ xAxis, yAxis });
    }
  };

  const handleMouseEnter = () => {
    setTransition('transform .5s ease-out');
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleMouseLeave = () => {
    // console.log('reset', e);
    setTransition('transform .5s ease-out');
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleClick = () => {
    if (!canEdit) {
      // if not in edit mode, flip card
      // flip {displayingFront} to display back
      setDisplayingFront(!displayingFront);
      setTransition('all .5s linear');
      setFlip(true);
      setTimeout(() => {
        setFlip(false);
      }, 500);
    }
  };

  // TESTING SIDE
  const handleTextEdit = (e) => {
    if (canEdit) {
      setFlashcard(
        displayingFront
          ? { ...flashcard, front: e.target.value }
          : { ...flashcard, back: e.target.value }
      );
      setFlashcardInputText(e.target.value);
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
      .then((newFlashcard) => {
        setFlashcards(
          flashcards.map((card) =>
            card.id !== flashcardToUpdate.id ? card : newFlashcard
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

  const firstLoad = useRef(true);
  useEffect(() => {
    // dont save flashcard on first load
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    // if switching from edit mode to non-edit mode, save
    if (!canEdit) {
      updateAndSaveFlashcard();
    }
  }, [canEdit]);

  const moveTypingIndicatorToEnd = (ref) => {
    ref.current.focus();
    const lengthOfText = ref.current.value.length * 2;
    ref.current.setSelectionRange(lengthOfText, lengthOfText);
  };

  const backTextRef = useRef();
  const frontTextRef = useRef();
  useEffect(() => {
    if (canEdit) {
      console.log(backTextRef, frontTextRef);
      moveTypingIndicatorToEnd(displayingFront ? frontTextRef : backTextRef);
    }
  }, [canEdit]);

  return (
    <div
      className={CardStyles.container}
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
        <div
          className={CardStyles.card}
          onClick={handleClick}
          style={divStyle}
          role="textbox"
          tabIndex="0"
          data-flashcard-element
        >
          <div
            className={`${CardStyles.face} ${CardStyles.front}`}
            style={{ transition }}
          >
            <span
              className={`${CardStyles.number} noselect`}
              data-card-number-element
            >
              {Number(currentFlashcardIndex) + 1}
            </span>
            <div className={`${CardStyles.center} noselect`}>
              <textarea
                type="text"
                className={
                  canEdit
                    ? `${CardStyles.text} ${CardStyles.editable}`
                    : `${CardStyles.text} noselect`
                }
                ref={frontTextRef}
                disabled={!canEdit}
                value={flashcard.front}
                onChange={handleTextEdit}
                data-flashcard-front-text
              />
            </div>
          </div>
          <div
            className={`${CardStyles.face} ${CardStyles.back}`}
            style={{ transition }}
          >
            <div className={`${CardStyles.center} noselect`}>
              <textarea
                type="text"
                className={
                  canEdit
                    ? `${CardStyles.text} ${CardStyles.editable}`
                    : `${CardStyles.text} noselect`
                }
                ref={backTextRef}
                disabled={!canEdit}
                value={flashcard.back}
                onChange={handleTextEdit}
                data-flashcard-back-text
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
