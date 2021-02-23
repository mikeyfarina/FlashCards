import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
  <div className="flashcard-tools">
    {userCreatedSet && (
      <div className="button-container">
        <Button
          onClick={handleNewFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'plus']} size="2x" />}
          className="new-flashcard-button"
        />
        <Button
          onClick={handleEditFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'pen']} size="2x" />}
          className="edit-flashcard-button"
        />
        <Button
          onClick={handleDeleteFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'trash']} size="2x" />}
          className="delete-flashcard-button"
          disabled={amountOfFlashcards <= 1}
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
