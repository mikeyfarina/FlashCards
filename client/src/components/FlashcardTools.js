import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import css from './FlashcardTools.module.css';
import CardSelection from './CardSelection';

const plus = ['fa', 'plus'];
const pen = ['fa', 'pen'];
const trash = ['fa', 'trash'];

const FlashcardTools = ({
  amountOfFlashcards,
  handleNewFlashCard,
  handleEditFlashCard,
  handleDeleteFlashCard,
  flashcards,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  userCreatedSet,
}) => (
  <div className={css.container}>
    {userCreatedSet && (
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
          <FontAwesomeIcon icon={pen} size="2x" />
        </button>
        <button
          onClick={handleDeleteFlashCard}
          className={css.delete}
          type="button"
          disabled={amountOfFlashcards <= 1}
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
);

export default FlashcardTools;
