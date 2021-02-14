import React, { useState } from 'react';

import flashcardService from '../services/flashcardService';

import Button from './Button';
import Flashcard from './Flashcard';
import FlashcardTools from './FlashcardTools';

const Flashcards = ({
  flashcards,
  setFlashcards,
  flashcardSets,
  currentSetIndex,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const [canEdit, setCanEdit] = useState(false);

  const handlePreviousCardClick = () => {
    currentFlashcardIndex - 1 < 0
      ? setCurrentFlashcardIndex(flashcards.length - 1)
      : setCurrentFlashcardIndex(currentFlashcardIndex - 1);
  };

  const handleNextCardClick = () => {
    currentFlashcardIndex + 1 >= flashcards.length
      ? setCurrentFlashcardIndex(0)
      : setCurrentFlashcardIndex(currentFlashcardIndex + 1);
  };

  const handleNewFlashCard = async (e) => {
    e.preventDefault();
    setCanEdit(false);

    const setId = flashcardSets[currentSetIndex].id;

    const newFlashcard = {
      front: 'front',
      back: 'back',
      setId,
    };

    flashcardService.createFlashcard(newFlashcard).then((newFlashcard) => {
      setFlashcards(flashcards.concat(newFlashcard));
      setCurrentFlashcardIndex(flashcards.length);
    });
  };

  const handleEditFlashCard = () => {
    setCanEdit(!canEdit);
  };

  const handleDeleteFlashCard = () => {
    setCanEdit(false);

    const flashcardToUpdate = flashcards[currentFlashcardIndex];
    flashcardService
      .deleteFlashcard(flashcardToUpdate.id)
      .then(() => {
        console.log('deleted');
        currentFlashcardIndex === 0
          ? setCurrentFlashcardIndex(0)
          : setCurrentFlashcardIndex(currentFlashcardIndex - 1);
        // updates front end as well not sure if best practice
        const newSet = flashcards.filter((_, i) => i !== currentFlashcardIndex);
        setFlashcards(newSet);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flashcards-display">
      <FlashcardTools
        amountOfFlashcards={flashcards ? flashcards.length : 0}
        handleNewFlashCard={handleNewFlashCard}
        handleEditFlashCard={handleEditFlashCard}
        handleDeleteFlashCard={handleDeleteFlashCard}
        flashcards={flashcards}
        currentFlashcardIndex={currentFlashcardIndex}
        setCurrentFlashcardIndex={setCurrentFlashcardIndex}
      />
      <div className="flashcard-selection">
        <Button
          onClick={handlePreviousCardClick}
          text={'\u261a'}
          className="change-card-button previous-flashcard-button"
        />
        <Flashcard
          canEdit={canEdit}
          currentFlashcardIndex={currentFlashcardIndex}
          flashcards={flashcards || []}
          setFlashcards={setFlashcards}
        />
        <Button
          onClick={handleNextCardClick}
          text={'\u261b'}
          className="change-card-button next-flashcard-button"
        />
      </div>
    </div>
  );
};

export default Flashcards;
