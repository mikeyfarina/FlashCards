import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import setService from '../services/setService';

import Button from './Button';

const Set = ({
  set,
  flashcards,
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
  const [indexOfSet, setIndexOfSet] = useState(null);

  useEffect(() => {
    setIndexOfSet(flashcardSets.findIndex((s) => s.id === set.id));
  }, []);

  useEffect(() => {
    setSetLength(flashcards.length);
  }, [flashcards]);

  const handleTitleClick = async () => {
    if (canEditTitle) return; // do nothing
    const dbSet = await setService.getSetById(set.id);
    const newIndex = flashcardSets.findIndex((set) => dbSet.id === set.id);

    setCurrentFlashcardIndex(0);
    if (newIndex === currentSet) return;
    else {
      setCurrentSet(newIndex);
    }
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
    flashcards.map((card, i) => {
      i === indexOfCardPreview && currentSet === indexOfSet
        ? setCurrentFlashcardIndex(indexOfCardPreview)
        : '';
    });
  };

  const handleDeleteSet = () => {
    const setId = flashcardSets[currentSet].id;
    setService.deleteSet(setId).then(() => {
      const updatedSets = flashcardSets.filter((n) => n !== setId);
      if (currentSet === 0 || currentSet >= flashcardSets.length - 1)
        setCurrentSet(0);
      if (currentSet <= flashcardSets.length) setCurrentSet(currentSet - 1);
      setFlashcardSets(updatedSets);
      console.log('deleted', currentSet);
    });
  };

  console.log(indexOfSet, currentSet);

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
      <div className="set__length">
        <span>{'length: ' + setLength}</span>
        <hr className={'divide-line'} />
      </div>
      <div className="set__preview">
        <ul>
          {flashcards.map((card, i) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Set;
