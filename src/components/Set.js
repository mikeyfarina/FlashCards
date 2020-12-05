import React, { useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Set = ({
  flashcards,
  set,
  setNumber,
  currentSet,
  setCurrentSet,
  flashcardSets,
  currentFlashcard,
  setCurrentFlashcard,
  setDisplayingFront,
}) => {
  const [setLength, setSetLength] = useState(set.flashcards.length);
  const [setTitle, setSetTitle] = useState(set.title);
  const [canEditTitle, setCanEditTitle] = useState(false);

  const handleTitleClick = (e) => {
    if (canEditTitle) return; // do nothing
    setCurrentFlashcard(0);
    setSetLength(set.flashcards.length);
    const newIndex = flashcardSets.findIndex(
      (fcSet) => setTitle === fcSet.title
    );
    console.log(newIndex, flashcardSets[newIndex]);
    setCurrentSet(newIndex);
  };

  //switch edit mode when edit title button is clicked
  const handleEditMode = (e) => {
    setCanEditTitle(!canEditTitle);
    if (canEditTitle) {
      set.title = setTitle;
    }
  };

  //changes setTitle state to input
  const handleTitleEdit = (e) => {
    if (canEditTitle) {
      console.log(canEditTitle, e.target.value);
      setSetTitle(e.target.value);
    }
  };

  const handleCardClick = (e) => {
    set.flashcards.map((card, i) => {
      card.front === e.target.innerText && setNumber === currentSet
        ? setCurrentFlashcard(i)
        : console.log('nope', card, i);
    });
    setDisplayingFront(true);
  };

  console.log(flashcards);

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
      </div>
      <div className="set__length">
        <span>{'length: ' + setLength}</span>
        <hr className={'divide-line'} />
      </div>
      <div className="set__preview">
        <ul>
          {set.flashcards.map((card, i) => (
            <li
              key={card.id}
              className={
                currentFlashcard === i && setNumber === currentSet
                  ? 'set__preview__item current-flashcard'
                  : 'set__preview__item'
              }
              onClick={handleCardClick}
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
