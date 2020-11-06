import react, {useState} from "react";

import Button from "./Button";
import Flashcard from "./Flashcard";

const Flashcards = ({flashcards, setFlashcards}) => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [displayingFront, setDisplayingFront] = useState(true);

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
    const newFlashcard = {
      front: "front",
      back: "back",
    };
    const newSet = [...flashcards, newFlashcard];
    setFlashcards(newSet);
    setCurrentFlashcard(flashcards.length);
  };

  return (
    <div className="flashcards-display">
      <Button
        onClick={handleNewFlashCard}
        text={"+"}
        className="new-flashcard-button"
      />
      <Button
        onClick={handleClick}
        text={"\u261a"}
        className="change-card-button"
      />
      <Flashcard
        currentFlashcard={currentFlashcard}
        flashcard={flashcards[currentFlashcard]}
        displayingFront={displayingFront}
        setDisplayingFront={setDisplayingFront}
      />
      <Button
        onClick={handleClick}
        text={"\u261b"}
        className="change-card-button"
      />
    </div>
  );
};

export default Flashcards;
