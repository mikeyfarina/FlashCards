import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import setService from '../services/setService';

import Button from './Button';

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
  const [indexOfSet] = useState(index);
  const [currentFlashcardsInSet, setCurrentFlashcardsInSet] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getCurrentSetFlashcards = async () => {
      const flashcardsOfSet = await setService.getAllFlashcardsInSet(set.id);
      setCurrentFlashcardsInSet(flashcardsOfSet);
      setSetLength(flashcardsOfSet.length);
    };
    getCurrentSetFlashcards();
  }, [flashcards, set.id]);

  const handleTitleClick = (e) => {
    if (canEditTitle) return; // do nothing
    e.stopPropagation();
    const newIndex = flashcardSets.findIndex((s) => set.id === s.id);
    setCurrentFlashcardIndex(0);
    setCurrentSetIndex(newIndex);
    history.push(`/flashcards/${set.id}/`);
  };

  // switch edit mode when edit title button is clicked
  const handleEditMode = async () => {
    setCanEditTitle(!canEditTitle);
    if (canEditTitle) {
      set.title = setTitle;
      await setService.updateSetTitle(set.id, setTitle);
    }
  };

  // changes setTitle state to input
  const handleTitleEdit = (e) => {
    if (canEditTitle) {
      setSetTitle(e.target.value);
    }
  };

  const handleCardClick = (e, indexOfCardPreview) => {
    currentFlashcardsInSet.map((card, i) => {
      i === indexOfCardPreview && currentSetIndex === indexOfSet
        ? setCurrentFlashcardIndex(indexOfCardPreview)
        : '';
    });
  };

  const handleDeleteSet = () => {
    setService.deleteSet(set.id).then(() => {
      const updatedSets = flashcardSets.filter((s) => s.id !== set.id);
      setFlashcardSets(updatedSets);
      if (currentSetIndex === 0 || currentSetIndex >= updatedSets.length - 1)
        setCurrentSetIndex(0);
      if (currentSetIndex <= updatedSets.length)
        setCurrentSetIndex(currentSetIndex - 1);
      console.log('deleted', currentSetIndex);
    });
  };

  const setRef = useRef();
  useEffect(() => {
    if (index === currentSetIndex) {
      setRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="sidebar__setlist__set" ref={setRef}>
      <div
        className="set__header"
        onClick={handleTitleClick}
        role="button"
        tabIndex="0"
      >
        <input
          className={
            canEditTitle ? 'edit-mode set__header__title' : 'set__header__title'
          }
          type="text"
          defaultValue={setTitle}
          disabled={!canEditTitle}
          onChange={handleTitleEdit}
        />
        {loggedInUser && loggedInUser.username === set.username && (
          <div style={{ display: 'contents' }}>
            <Button
              onClick={handleEditMode}
              className={
                canEditTitle
                  ? 'edit-mode title-edit-button'
                  : 'title-edit-button'
              }
              text={
                canEditTitle ? (
                  <FontAwesomeIcon icon={['fa', 'save']} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={['fa', 'edit']} size="sm" />
                )
              }
            />
            <Button
              onClick={handleDeleteSet}
              className="title-edit-button"
              text={<FontAwesomeIcon icon={['fa', 'trash']} size="sm" />}
            />
          </div>
        )}
      </div>
      <div className="set__info">
        <div className="set__length">
          <span>{`length: ${setLength}`}</span>
        </div>
        <div className="set__creator">
          <Link
            to={`/users/${set.username}`}
            className="user-link"
            onClick={(e) => e.stopPropagation()}
          >
            <strong>{set.username}</strong>
          </Link>
        </div>
        <hr className="divide-line" />
      </div>
      <div className="set__preview" ref={cardContainerRef}>
        <div style={{ maxHeight: '20vh', padding: '2% 0' }}>
          {currentFlashcardsInSet
            ? currentFlashcardsInSet.map((card, i) => (
                <div
                  key={card.id}
                  className={
                    flashcards[currentFlashcardIndex] &&
                    flashcards[currentFlashcardIndex].id === card.id
                      ? 'set__preview__item current-flashcard'
                      : 'set__preview__item'
                  }
                  ref={(el) => {
                    cardRefs.push(el);
                  }}
                  onClick={(e) => handleCardClick(e, i)}
                  role="button"
                  tabIndex="0"
                >
                  {card.front}
                </div>
              ))
            : 'loading...'}
        </div>
      </div>
    </div>
  );
};

export default Set;
