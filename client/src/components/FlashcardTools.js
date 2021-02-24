import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ToolsStyles from './FlashcardTools.module.css';
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
  <div className={ToolsStyles.container}>
    {userCreatedSet && (
      <div className={ToolsStyles.buttons}>
        <Button
          onClick={handleNewFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'plus']} size="2x" />}
          className={ToolsStyles.create}
          testingTag="data-new-flashcard-button"
        />
        <Button
          onClick={handleEditFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'pen']} size="2x" />}
          className={ToolsStyles.edit}
          testingTag="data-edit-flashcard-button"
        />
        <Button
          onClick={handleDeleteFlashCard}
          text={<FontAwesomeIcon icon={['fa', 'trash']} size="2x" />}
          className={ToolsStyles.delete}
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
