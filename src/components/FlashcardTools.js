import React from "react";
import Button from "./Button";

const FlashcardTools = ({
  amountOfFlashcards,
  handleNewFlashCard,
  handleEditFlashCard,
  handleDeleteFlashCard,
}) => {
  return (
    <div className="flashcard-tools">
      <Button
        onClick={handleNewFlashCard}
        text={"+"}
        className="new-flashcard-button"
      />
      <Button
        onClick={handleEditFlashCard}
        text={"EDIT"}
        className="edit-flashcard-button"
      />
      <Button
        onClick={handleDeleteFlashCard}
        text={"DELETE"}
        className="delete-flashcard-button"
        disabled={amountOfFlashcards <= 1}
      />
    </div>
  );
};

export default FlashcardTools;
