import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import useMousePosition from '../hooks/useMousePosition';
import css from './Flashcard.module.css';
import flashcardService from '../services/flashcardService';
import LoadingFlashcardPlaceholder from './LoadingFlashcardPlaceholder';

const Flashcard = ({
  flashcards,
  setFlashcards,
  currentFlashcardIndex, // index
  canEdit,
}) => {
  const [flashcard, setFlashcard] = useState(null);
  const [flashcardInputText, setFlashcardInputText] = useState('');
  const [displayingFront, setDisplayingFront] = useState(true);
  const [flip, setFlip] = useState(false);
  const {
    handleMouseEnterExit,
    handleMouseMove,
    mousePosition,
  } = useMousePosition(flip);

  const divStyle = useMemo(() => {
    const rotateX = displayingFront
      ? 180 + mousePosition.yAxis
      : mousePosition.yAxis * 1.5;
    const rotateY = !flip ? mousePosition.xAxis : 0;
    return {
      transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      WebkitTransform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      MozTransform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
    };
  }, [mousePosition.xAxis, mousePosition.yAxis, displayingFront, flip]);

  useEffect(() => {
    const newFlashcard = flashcards[currentFlashcardIndex];
    setFlashcard(newFlashcard);
    setDisplayingFront(true);
    setFlashcard(flashcards[currentFlashcardIndex] || null);
  }, [currentFlashcardIndex, flashcards]);

  const handleClick = useCallback(() => {
    if (!canEdit) {
      // if not in edit mode, flip card
      // flip {displayingFront} to display back
      setDisplayingFront(!displayingFront);

      setFlip(true);
      setTimeout(() => {
        setFlip(false);
      }, 500);
    }
  }, [canEdit, displayingFront]);

  // TESTING SIDE
  const handleTextEdit = useCallback(
    (e) => {
      if (canEdit) {
        setFlashcard(
          displayingFront
            ? { ...flashcard, front: e.target.value }
            : { ...flashcard, back: e.target.value }
        );
        setFlashcardInputText(e.target.value);
      }
    },
    [canEdit, displayingFront, flashcard]
  );

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

  const moveTypingIndicatorToEnd = useCallback((ref) => {
    ref.current.focus();
    const twiceSizeOfText = ref.current.value.length * 2;
    ref.current.setSelectionRange(twiceSizeOfText, twiceSizeOfText);
  }, []);

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
      className={css.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseEnterExit}
      onMouseEnter={handleMouseEnterExit}
    >
      {!flashcard ? (
        <LoadingFlashcardPlaceholder mousePosition={mousePosition} />
      ) : (
        <div
          className={cn(css.card)}
          onClick={handleClick}
          style={divStyle}
          role="textbox"
          tabIndex="0"
          data-flashcard-element
        >
          <div className={cn(css.face, css.front)}>
            <span
              className={cn(css.number, 'noselect')}
              data-card-number-element
            >
              {Number(currentFlashcardIndex) + 1}
            </span>
            <textarea
              type="text"
              className={cn(
                css.text,
                { [css.editable]: canEdit },
                { noselect: !canEdit }
              )}
              ref={frontTextRef}
              disabled={!canEdit}
              value={flashcard.front}
              onChange={handleTextEdit}
              data-flashcard-front-text
            />
          </div>
          <div className={cn(css.face, css.back)}>
            <textarea
              type="text"
              className={cn(
                css.text,
                { [css.editable]: canEdit },
                { noselect: !canEdit }
              )}
              ref={backTextRef}
              disabled={!canEdit}
              value={flashcard.back}
              onChange={handleTextEdit}
              data-flashcard-back-text
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
