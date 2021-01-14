import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import setService from '../services/setService';

import Button from './Button';

const Set = ({
  set,
  flashcards,
  index,
  setCreator,
  currentSet,
  setCurrentSet,
  flashcardSets,
  setFlashcardSets,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const [setLength, setSetLength] = useState(0);
  const [setTitle, setSetTitle] = useState(set.title);
  const [canEditTitle, setCanEditTitle] = useState(false);
  const [indexOfSet] = useState(index);
  const [currentFlashcards, setCurrentFlashcards] = useState(flashcards);

  useEffect(async () => {
    const setFlashcards = await setService.getAllFlashcardsInSet(set.id);
    setCurrentFlashcards(setFlashcards);
    setSetLength(setFlashcards.length);
  }, [flashcards, currentFlashcardIndex]);

  const handleTitleClick = () => {
    console.log('clicked');
    if (canEditTitle) return; // do nothing

    const newIndex = flashcardSets.findIndex((s) => set.id === s.id);
    if (!(newIndex === currentSet)) setCurrentSet(newIndex);
  };

  // switch edit mode when edit title button is clicked
  const handleEditMode = () => {
    setCanEditTitle(!canEditTitle);
    if (canEditTitle) {
      set.title = setTitle;
    }
  };

  // changes setTitle state to input
  const handleTitleEdit = (e) => {
    if (canEditTitle) {
      setSetTitle(e.target.value);
    }
  };

  const handleCardClick = (e, indexOfCardPreview) => {
    currentFlashcards.map((card, i) => {
      i === indexOfCardPreview && currentSet === indexOfSet
        ? setCurrentFlashcardIndex(indexOfCardPreview)
        : '';
    });
  };

  const handleDeleteSet = () => {
    setService.deleteSet(set.id).then(() => {
      const updatedSets = flashcardSets.filter((s) => s.id !== set.id);
      setFlashcardSets(updatedSets);
      if (currentSet === 0 || currentSet >= updatedSets.length - 1)
        setCurrentSet(0);
      if (currentSet <= updatedSets.length) setCurrentSet(currentSet - 1);
      console.log('deleted', currentSet);
    });
  };

  console.log('set', flashcards);

  return (
    <div className="sidebar__setlist__set">
      <div className="set__header" onClick={handleTitleClick}>
        <input
          className={'noselect set__header__title'}
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
          disabled={currentSet === indexOfSet ? false : true}
        />
      </div>
      <div className="set__info">
        <div className="set__length">
          <span>{'length: ' + setLength}</span>
        </div>
        <div className="set__creator">
          <span>{setCreator}</span>
        </div>
        <hr className={'divide-line'} />
      </div>
      <div className="set__preview">
        <ul>
          {currentFlashcards
            ? currentFlashcards.map((card, i) => (
                <li
                  key={card.id}
                  className={
                    currentFlashcardIndex === i && indexOfSet === currentSet
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
