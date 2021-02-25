import React, { useState } from 'react';
import css from './Flashcards.module.css';
import flashcardService from '../services/flashcardService';
import Flashcard from './Flashcard';
import FlashcardTools from './FlashcardTools';

const Flashcards = ({
  flashcards,
  setFlashcards,
  flashcardSets,
  currentSetIndex,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  loggedInUser,
}) => {
  const [canEdit, setCanEdit] = useState(false);

  const handlePreviousCardClick = () => {
    setCurrentFlashcardIndex(
      currentFlashcardIndex - 1 < 0
        ? flashcards.length - 1
        : currentFlashcardIndex - 1
    );
  };

  const handleNextCardClick = () => {
    setCurrentFlashcardIndex(
      currentFlashcardIndex + 1 >= flashcards.length
        ? 0
        : currentFlashcardIndex + 1
    );
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

    flashcardService.createFlashcard(newFlashcard).then((createdFlashcard) => {
      setFlashcards([...flashcards, createdFlashcard]);
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
        setCurrentFlashcardIndex(
          currentFlashcardIndex === 0 ? 0 : currentFlashcardIndex - 1
        );
        // updates front end as well not sure if best practice
        const newSet = flashcards.filter((_, i) => i !== currentFlashcardIndex);
        setFlashcards(newSet);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={css.container}>
      <FlashcardTools
        amountOfFlashcards={flashcards ? flashcards.length : 0}
        handleNewFlashCard={handleNewFlashCard}
        handleEditFlashCard={handleEditFlashCard}
        handleDeleteFlashCard={handleDeleteFlashCard}
        flashcards={flashcards}
        currentFlashcardIndex={currentFlashcardIndex}
        setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        loggedInUser={loggedInUser}
        userCreatedSet={
          flashcardSets &&
          loggedInUser &&
          flashcardSets[currentSetIndex].username === loggedInUser.username
        }
      />
      <div className={css.display}>
        <button
          className={css.button}
          onClick={handlePreviousCardClick}
          testingTag="data-previous-card-button"
          type="button"
        >
          {'\u261a'}
        </button>
        <Flashcard
          canEdit={canEdit}
          currentFlashcardIndex={currentFlashcardIndex}
          flashcards={flashcards || []}
          setFlashcards={setFlashcards}
        />
        <button
          onClick={handleNextCardClick}
          className={css.button}
          testingTag="data-next-card-button"
          type="button"
        >
          {'\u261b'}
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
