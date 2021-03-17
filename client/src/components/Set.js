import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cn from 'classnames';
import css from './Set.module.css';
import setService from '../services/setService';
import SetItem from './SetItem';

const save = ['fa', 'save'];
const edit = ['fa', 'pen'];
const trash = ['fa', 'trash'];

const Set = ({
  loggedInUser,
  flashcards,
  set,
  index,
  currentSetIndex,
  setCurrentSetIndex,
  flashcardSets,
  setFlashcardSets,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const [setLength, setSetLength] = useState(0);
  const [setTitle, setSetTitle] = useState(set.title);
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [currentFlashcardsInSet, setCurrentFlashcardsInSet] = useState(null);
  const [currentSet, setCurrentSet] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getCurrentSetFlashcards = async () => {
      const flashcardsOfSet = await setService.getAllFlashcardsInSet(set.id);
      setCurrentFlashcardsInSet(flashcardsOfSet);
      setSetLength(flashcardsOfSet.length);
    };
    getCurrentSetFlashcards();
  }, [flashcards, set.id]);

  const handleTitleClick = useCallback(
    (e) => {
      if (canEditTitle) return; // do nothing
      e.stopPropagation();
      const newIndex = flashcardSets.findIndex((s) => set.id === s.id);
      setCurrentFlashcardIndex(0);
      setCurrentSetIndex(newIndex);
      history.push(`/flashcards/${set.id}/`);
    },
    [canEditTitle, flashcardSets, history]
  );

  // switch edit mode when edit title button is clicked
  const handleEditMode = useCallback(async () => {
    setCanEditTitle(!canEditTitle);
    if (canEditTitle) {
      await setService.updateSetTitle(set.id, setTitle);
    }
  }, [canEditTitle, set.id, setTitle]);

  const moveTypingIndicatorToEnd = useCallback((ref) => {
    ref.current.focus();
    const twiceSizeOfText = ref.current.value.length * 2;
    ref.current.setSelectionRange(twiceSizeOfText, twiceSizeOfText);
  }, []);

  const titleRef = useRef();
  useEffect(() => {
    if (canEditTitle) moveTypingIndicatorToEnd(titleRef);
  }, [canEditTitle]);

  // changes setTitle state to input
  const handleTitleEdit = useCallback(
    (e) => {
      if (canEditTitle) {
        setSetTitle(e.target.value);
      }
    },
    [canEditTitle]
  );

  const handleDeleteSet = useCallback(
    (e) => {
      if (!window.confirm(`Are you sure you want to delete '${set.title}'?`)) {
        return;
      }
      e.stopPropagation();
      setService.deleteSet(set.id).then(() => {
        const updatedSets = flashcardSets.filter((s) => s.id !== set.id);
        setFlashcardSets(updatedSets);
        console.log('deleted', currentSetIndex, updatedSets.length);
        if (currentSetIndex === 0) {
          setCurrentSetIndex(0);
        }
        if (currentSetIndex >= updatedSets.length - 1) {
          setCurrentSetIndex(updatedSets.length - 1);
        }
        if (currentSetIndex <= updatedSets.length - 1) {
          setCurrentSetIndex(currentSetIndex);
        }
      });
    },
    [set.id, currentSetIndex, flashcardSets]
  );

  const setRef = useRef();
  useEffect(() => {
    if (index === currentSetIndex) {
      setRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSet(index === currentSetIndex);
  }, [currentSetIndex, index]);

  const cardContainerRef = useRef();
  const cardRefs = [];
  useEffect(() => {
    if (index === currentSetIndex && cardRefs[currentFlashcardIndex]) {
      cardContainerRef.current.scrollTo({
        top: cardRefs[currentFlashcardIndex].offsetTop - 10,
        behavior: 'smooth',
      });
    }
  }, [currentFlashcardIndex, currentSetIndex, index]);

  return (
    <div
      className={cn(css.container, { [css.current]: currentSet })}
      ref={setRef}
    >
      <div
        className={cn(css.header)}
        onClick={handleTitleClick}
        role="button"
        tabIndex="-1"
      >
        <input
          className={cn(css.title, { [css.editing]: canEditTitle })}
          type="text"
          defaultValue={setTitle}
          disabled={!canEditTitle}
          onChange={handleTitleEdit}
          ref={titleRef}
        />
      </div>
      {loggedInUser?.username === set?.username && (
        <div className={css.tools}>
          <button
            onClick={handleEditMode}
            className={cn(css.button, css.edit, {
              [css.editing]: canEditTitle,
            })}
            type="button"
          >
            {canEditTitle ? (
              <>
                Save <FontAwesomeIcon icon={save} size="sm" />
              </>
            ) : (
              <>
                Edit Title <FontAwesomeIcon icon={edit} size="sm" />
              </>
            )}
          </button>
          <button
            onClick={handleDeleteSet}
            className={cn(css.button, css.delete)}
            type="button"
          >
            <>
              Delete Set <FontAwesomeIcon icon={trash} size="sm" />
            </>
          </button>
        </div>
      )}
      <div className={css.info}>
        <div className={css.size}>
          <span>length: {setLength}</span> |
        </div>{' '}
        <div className={css.author}>
          User:{' '}
          <Link
            to={`/users/${set.username}`}
            className={css.link}
            onClick={(e) => e.stopPropagation()}
          >
            <strong>
              {loggedInUser?.username === set?.username ? 'you' : set.username}
            </strong>
          </Link>
        </div>
      </div>
      <div className={css.cards} ref={cardContainerRef}>
        <div className={css.display}>
          {currentFlashcardsInSet
            ? currentFlashcardsInSet.map((card, i) => (
                <SetItem
                  key={card.id}
                  card={card}
                  indexOfCard={i}
                  currentFlashcardIndex={currentFlashcardIndex}
                  setCurrentFlashcardIndex={setCurrentFlashcardIndex}
                  currentSet={currentSet}
                  cardRefs={cardRefs}
                  setCurrentSetIndex={setCurrentSetIndex}
                  indexOfSet={index}
                />
              ))
            : 'loading...'}
        </div>
      </div>
    </div>
  );
};

export default Set;
