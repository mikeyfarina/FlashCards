import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import cn from 'classnames';
import css from './Set.module.css';
import setService from '../services/setService';
import SetItem from './SetItem';

const save = ['fa', 'save'];
const edit = ['fa', 'edit'];
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
  const handleEditMode = async () => {
    setCanEditTitle(!canEditTitle);
    if (canEditTitle) {
      await setService.updateSetTitle(set.id, setTitle);
    }
  };

  // changes setTitle state to input
  const handleTitleEdit = (e) => {
    if (canEditTitle) {
      setSetTitle(e.target.value);
    }
  };

  const handleDeleteSet = () => {
    setService.deleteSet(set.id).then(() => {
      const updatedSets = flashcardSets.filter((s) => s.id !== set.id);
      setFlashcardSets(updatedSets);
      if (currentSetIndex === 0 || currentSetIndex >= updatedSets.length - 1) {
        setCurrentSetIndex(0);
      }
      if (currentSetIndex <= updatedSets.length) {
        setCurrentSetIndex(currentSetIndex - 1);
      }
      console.log('deleted', currentSetIndex);
    });
  };

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
        top: cardRefs[currentFlashcardIndex].offsetTop,
        behavior: 'smooth',
      });
    }
  }, [currentFlashcardIndex, currentSetIndex, index]);

  return (
    <div className={css.container} ref={setRef}>
      <div
        className={cn(css.header, { [css.current]: index === currentSetIndex })}
        onClick={handleTitleClick}
        role="button"
        tabIndex="0"
      >
        <input
          className={cn(css.title, { [css.editing]: canEditTitle })}
          type="text"
          defaultValue={setTitle}
          disabled={!canEditTitle}
          onChange={handleTitleEdit}
        />
        {loggedInUser && loggedInUser.username === set.username && (
          <>
            <button
              onClick={handleEditMode}
              className={cn(css.button, { [css.editing]: canEditTitle })}
              type="button"
            >
              {canEditTitle ? (
                <FontAwesomeIcon icon={save} size="sm" />
              ) : (
                <FontAwesomeIcon icon={edit} size="sm" />
              )}
            </button>
            <button
              onClick={handleDeleteSet}
              className={css.button}
              type="button"
            >
              <FontAwesomeIcon icon={trash} size="sm" />
            </button>
          </>
        )}
      </div>
      <div className={css.info}>
        <div className={css.size}>
          <span>length: {setLength}</span>
        </div>
        <div className={css.author}>
          <Link
            to={`/users/${set.username}`}
            className={css.link}
            onClick={(e) => e.stopPropagation()}
          >
            <strong>{set.username}</strong>
          </Link>
        </div>
        <hr className={css.line} />
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
                />
              ))
            : 'loading...'}
        </div>
      </div>
    </div>
  );
};

export default Set;
