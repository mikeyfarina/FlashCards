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

  useEffect(() => {
    setSetLength(flashcards.length);
  }, [flashcards]);

  console.log(set, flashcards);
  const handleTitleClick = () => {
    if (canEditTitle) return; // do nothing

    setCurrentFlashcardIndex(0);
    setSetLength(flashcards.length);
    const newIndex = flashcardSets.findIndex(
      (fcSet) => setTitle === fcSet.title
    );
    console.log(newIndex, flashcardSets[newIndex]);
    setCurrentSet(newIndex);
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
    console.log(e);
    flashcards.map((card) => {
      console.log(card.front);
      card.front === e.target.innerText
        ? setCurrentFlashcardIndex(indexOfCardPreview)
        : console.log('nope', card, indexOfCardPreview);
    });
  };

  const handleDeleteSet = () => {
    const setId = flashcardSets[currentSet].id;
    setService.deleteSet(setId).then(() => {
      console.log('deleted');
      currentSet === 0 ? currentSet(0) : currentSet(currentSet - 1);

      const updatedSets = flashcardSets.filter((n) => n !== setId);
      setFlashcardSets(updatedSets);
    });
  };

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
                currentFlashcardIndex === i
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
