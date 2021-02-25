import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import css from './FlashcardTools.module.css';
import Button from './Button';
import CardSelection from './CardSelection';

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
        <Button
          onClick={handleNewFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'plus']} size="2x" />}
          className={css.create}
          testingTag="data-new-flashcard-button"
        />
        <Button
          onClick={handleEditFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'pen']} size="2x" />}
          className={css.edit}
          testingTag="data-edit-flashcard-button"
        />
        <Button
          onClick={handleDeleteFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'trash']} size="2x" />}
          className={css.delete}
          disabled={amountOfFlashcards <= 1}
          testingTag="data-delete-flashcard-button"
        />
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
