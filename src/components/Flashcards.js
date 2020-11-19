import react, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import Button from "./Button";
import FlashcardTools from "./FlashcardTools";
const Flashcards = ({
  flashcards,
  setFlashcards,
  newCardId,
  setNewCardId,
  currentFlashcard,
  setCurrentFlashcard,
  displayingFront,
  setDisplayingFront,
}) => {
  const [canEdit, setCanEdit] = useState(false);
  const [newFlashcardText, setNewFlashcardText] = useState({
    front: "new flashcard",
    back: "back of new flashcard",
  });

  console.log(flashcards);

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
      id: newCardId,
      front: "front",
      back: "back",
    };

    const newSet = flashcards.concat(newFlashcard);
    const newCardIndex = newSet.length - 1;

    setNewCardId(newCardId + 1);
    setFlashcards(newSet);
    setCurrentFlashcard(newCardIndex);

    console.log(newSet, newSet.length - 1, flashcards, currentFlashcard);
  };

  const handleEditFlashCard = (e) => {
    setCanEdit(!canEdit);
    console.log(canEdit);

    if (canEdit) {
    }
  };

  const handleDeleteFlashCard = (e) => {
    setDisplayingFront(true);
    setCanEdit(false);

    console.log("Delete", currentFlashcard, flashcards);
    const newSet = flashcards.filter((_, i) => i !== currentFlashcard);
    currentFlashcard === 0
      ? setCurrentFlashcard(0)
      : setCurrentFlashcard(currentFlashcard - 1);
    setFlashcards(newSet);
    console.log("After Delete", newSet, currentFlashcard, flashcards);
  };

  const flashcard = flashcards[currentFlashcard];
  return (
    <div className="flashcards-display">
      <FlashcardTools
        amountOfFlashcards={flashcards.length}
        handleNewFlashCard={handleNewFlashCard}
        handleEditFlashCard={handleEditFlashCard}
        handleDeleteFlashCard={handleDeleteFlashCard}
        flashcards={flashcards}
        setCurrentFlashcard={setCurrentFlashcard}
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
          flashcard={flashcard}
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
