import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import setService from '../services/setService';

import Button from './Button';

const Set = ({
  flashcards,
  set,
  index,
  setCreator,
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

  const getCurrentSetFlashcards = async () => {
    const flashcardsOfSet = await setService.getAllFlashcardsInSet(set.id);
    setCurrentFlashcardsInSet(flashcardsOfSet);
    setSetLength(flashcardsOfSet.length);
  };

  useEffect(() => {
    getCurrentSetFlashcards();
  }, [flashcards, set.id]);

  const handleTitleClick = () => {
    if (canEditTitle) return; // do nothing

    console.log(currentSetIndex);

    const newIndex = flashcardSets.findIndex((s) => set.id === s.id);
    setCurrentFlashcardIndex(0);
    setCurrentSetIndex(newIndex);
    history.push(`/flashcards/${set.id}/`);
  };

  // switch edit mode when edit title button is clicked
  const handleEditMode = () => {
    setCanEditTitle(!canEditTitle);
    if (canEditTitle) {
      set.title = setTitle;
      console.log('saving edit to server');
      setService.updateSetTitle(set.id, setTitle).then((updatedSet) => {
        console.log(updatedSet);
      });
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

  return (
    <div className="sidebar__setlist__set" ref={setRef}>
      <div className="set__header" onClick={handleTitleClick}>
        <input
          className={'set__header__title'}
          type="text"
          defaultValue={setTitle}
          disabled={!canEditTitle}
          onChange={handleTitleEdit}
        />
        <Button
          onClick={handleEditMode}
          className={
            canEditTitle ? 'edit-mode title-edit-button' : 'title-edit-button'
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
          className={'title-edit-button'}
          text={<FontAwesomeIcon icon={['fa', 'trash']} size="sm" />}
        />
      </div>
      <div className="set__info">
        <div className="set__length">
          <span>{'length: ' + setLength}</span>
        </div>
        <div className="set__creator">
          <Link
            to={`/users/${set.username}`}
            className={'user-link'}
            onClick={(e) => e.stopPropagation()}
          >
            <strong>{set.username}</strong>
          </Link>
        </div>
        <hr className={'divide-line'} />
      </div>
      <div className="set__preview">
        <ul>
          {currentFlashcardsInSet
            ? currentFlashcardsInSet.map((card, i) => (
                <li
                  key={card.id}
                  className={
                    flashcards[currentFlashcardIndex] &&
                    flashcards[currentFlashcardIndex].id === card.id
                      ? 'set__preview__item current-flashcard'
                      : 'set__preview__item'
                  }
                  onClick={(e) => handleCardClick(e, i)}
                >
                  {card.front}
                </li>
              ))
            : 'loading...'}
        </ul>
      </div>
    </div>
  );
};

export default Set;
