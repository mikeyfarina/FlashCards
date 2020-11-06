import react, { useState } from "react";
import Flashcard from "./Flashcard";
import Button from "./Button";
import FlashcardTools from "./FlashcardTools";

const Flashcards = ({ flashcards, setFlashcards }) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [displayingFront, setDisplayingFront] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [newFlashcardText, setNewFlashcardText] = useState({
    front: "new flashcard",
    back: "back of new flashcard",
  });

  const handleClick = (e) => {
    console.log("clicked");
    console.log("dir, cc", e, currentFlashcard);
    setDisplayingFront(true);
    if (e.target.innerText === "\u261a") {
      //going to previous card
      currentFlashcard - 1 < 0
        ? setCurrentFlashcard(flashcards.length - 1)
        : setCurrentFlashcard(currentFlashcard - 1);
    } else {
      currentFlashcard + 1 >= flashcards.length
        ? setCurrentFlashcard(0)
        : setCurrentFlashcard(currentFlashcard + 1);
    }
  };

  const handleNewFlashCard = (e) => {
    setCanEdit(false);
    setDisplayingFront(true);

    const newFlashcard = {
      front: "front",
      back: "back",
    };
    const newSet = [...flashcards, newFlashcard];

    setFlashcards(newSet);
    setCurrentFlashcard(flashcards.length);
  };

  const handleEditFlashCard = (e) => {
    setCanEdit(!canEdit);
    console.log(canEdit);
  };

  const handleDeleteFlashCard = (e) => {
    setDisplayingFront(true);
    setCanEdit(false);
    console.log("Delete", currentFlashcard, flashcards);
    const newSet = flashcards.filter((_, i) => i !== currentFlashcard);
    const newCurrentCard =
      currentFlashcard === 0
        ? setCurrentFlashcard(0)
        : setCurrentFlashcard(currentFlashcard - 1);
    setFlashcards(newSet);
    console.log("After Delete", newSet, currentFlashcard, flashcards);
  };

  return (
    <div className="flashcards-display">
      <FlashcardTools
        amountOfFlashcards={flashcards.length}
        handleNewFlashCard={handleNewFlashCard}
        handleEditFlashCard={handleEditFlashCard}
        handleDeleteFlashCard={handleDeleteFlashCard}
      />
      <div className="flashcard-selection">
        <Button
          onClick={handleClick}
          text={"\u261a"}
          className="change-card-button"
        />
        <Flashcard
          canEdit={canEdit}
          currentFlashcard={currentFlashcard}
          flashcard={flashcards[currentFlashcard]}
          displayingFront={displayingFront}
          setDisplayingFront={setDisplayingFront}
          newFlashcardText={newFlashcardText}
          setNewFlashcardText={setNewFlashcardText}
        />
        <Button
          onClick={handleClick}
          text={"\u261b"}
          className="change-card-button"
        />
      </div>
    </div>
  );
};

export default Flashcards;
