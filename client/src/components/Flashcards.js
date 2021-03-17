import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import css from './Flashcards.module.css';
import flashcardService from '../services/flashcardService';
import Flashcard from './Flashcard';
import CardSelection from './CardSelection';

const rightArrows = ['fa', 'angle-double-right'];
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
  sidebarDisplayed,
  setSidebarDisplayed,
}) => {
  const [canEdit, setCanEdit] = useState(false);

  const handlePreviousCardClick = useCallback(() => {
    setCurrentFlashcardIndex(
      currentFlashcardIndex - 1 < 0
        ? flashcards.length - 1
        : currentFlashcardIndex - 1
    );
  }, [currentFlashcardIndex, flashcards]);

  const handleNextCardClick = useCallback(() => {
    setCurrentFlashcardIndex(
      currentFlashcardIndex + 1 >= flashcards.length
        ? 0
        : currentFlashcardIndex + 1
    );
  }, [currentFlashcardIndex, flashcards]);

  const handleNewFlashCard = useCallback(
    async (e) => {
      e.preventDefault();
      setCanEdit(false);

      const setId = flashcardSets[currentSetIndex].id;

      console.log(setId);
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

  const expandSidebar = useCallback(() => {
    setSidebarDisplayed(!sidebarDisplayed);
  }, [sidebarDisplayed]);

  return (
    <div className={css.container}>
      <div className={css.tools}>
        {flashcardSets?.[currentSetIndex]?.username ===
          loggedInUser?.username && (
          <div className={css.flashcardButtons}>
            <button
              type="button"
              className={css.expand}
              onClick={expandSidebar}
            >
              Flashcard Sets <FontAwesomeIcon icon={rightArrows} />
            </button>
            <button
              onClick={handleNewFlashCard}
              className={css.create}
              type="button"
              data-new-flashcard-button
            >
              New Flashcard <FontAwesomeIcon icon={plus} size="2x" />
            </button>
            <button
              onClick={handleEditFlashCard}
              className={css.edit}
              type="button"
              data-edit-flashcard-button
            >
              {canEdit ? (
                <>
                  Save <FontAwesomeIcon icon={save} size="2x" />
                </>
              ) : (
                <>
                  Edit <FontAwesomeIcon icon={pen} size="2x" />
                </>
              )}
            </button>
            <button
              onClick={handleDeleteFlashCard}
              className={css.delete}
              type="button"
              disabled={!flashcards || flashcards.length === 0}
              data-delete-flashcard-button
            >
              Delete <FontAwesomeIcon icon={trash} size="2x" />
            </button>
          </div>
        )}
        <CardSelection
          set={flashcardSets?.[currentSetIndex]}
          flashcards={flashcards}
          currentFlashcardIndex={currentFlashcardIndex}
          setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        />
      </div>

      <div className={css.display}>
        <div className={css.displayButtons}>
          <button
            className={css.button}
            onClick={handlePreviousCardClick}
            type="button"
            data-previous-card-button
          >
            {'\u261a'}
          </button>
          <button
            onClick={handleNextCardClick}
            className={css.button}
            type="button"
            data-next-card-button
          >
            {'\u261b'}
          </button>
        </div>
        <Flashcard
          canEdit={canEdit}
          currentFlashcardIndex={currentFlashcardIndex}
          flashcards={flashcards || []}
          setFlashcards={setFlashcards}
        />
      </div>
    </div>
  );
};

export default Flashcards;
