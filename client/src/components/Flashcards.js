import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import css from './Flashcards.module.css';
import flashcardService from '../services/flashcardService';
import Flashcard from './Flashcard';
import CardSelection from './CardSelection';

const plus = ['fa', 'plus'];
const pen = ['fa', 'pen'];
const save = ['fa', 'save'];
const trash = ['fa', 'trash'];

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

  const handlePreviousCardClick = useCallback(() => {
    setCurrentFlashcardIndex(
      currentFlashcardIndex - 1 < 0
        ? flashcards.length - 1
        : currentFlashcardIndex - 1
    );
  }, [currentFlashcardIndex, flashcards.length]);

  const handleNextCardClick = useCallback(() => {
    setCurrentFlashcardIndex(
      currentFlashcardIndex + 1 >= flashcards.length
        ? 0
        : currentFlashcardIndex + 1
    );
  }, [currentFlashcardIndex, flashcards.length]);

  const handleNewFlashCard = useCallback(
    async (e) => {
      e.preventDefault();
      setCanEdit(false);

      const setId = flashcardSets[currentSetIndex].id;

      const newFlashcard = {
        front: 'front',
        back: 'back',
        setId,
      };

      flashcardService
        .createFlashcard(newFlashcard)
        .then((createdFlashcard) => {
          setFlashcards([...flashcards, createdFlashcard]);
          setCurrentFlashcardIndex(flashcards.length);
        });
    },
    [flashcardSets, currentSetIndex, flashcards]
  );

  const handleEditFlashCard = useCallback(() => {
    setCanEdit(!canEdit);
  }, [canEdit]);

  const handleDeleteFlashCard = useCallback(() => {
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
  }, [flashcards, currentFlashcardIndex]);

  return (
    <div className={css.container}>
      <div className={css.tools}>
        {flashcardSets &&
          loggedInUser &&
          flashcardSets[currentSetIndex].username === loggedInUser.username && (
            <div className={css.buttons}>
              <button
                onClick={handleNewFlashCard}
                className={css.create}
                type="button"
                data-new-flashcard-button
              >
                <FontAwesomeIcon icon={plus} size="2x" />
              </button>
              <button
                onClick={handleEditFlashCard}
                className={css.edit}
                type="button"
                data-edit-flashcard-button
              >
                {canEdit ? (
                  <FontAwesomeIcon icon={save} size="2x" />
                ) : (
                  <FontAwesomeIcon icon={pen} size="2x" />
                )}
              </button>
              <button
                onClick={handleDeleteFlashCard}
                className={css.delete}
                type="button"
                disabled={!flashcards || flashcards.length === 0}
                data-delete-flashcard-button
              >
                <FontAwesomeIcon icon={trash} size="2x" />
              </button>
            </div>
          )}
        <CardSelection
          flashcards={flashcards}
          currentFlashcardIndex={currentFlashcardIndex}
          setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        />
      </div>
      <div className={css.display}>
        <button
          className={css.button}
          onClick={handlePreviousCardClick}
          type="button"
          data-previous-card-button
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
          type="button"
          data-next-card-button
        >
          {'\u261b'}
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
