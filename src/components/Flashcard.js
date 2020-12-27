import React, {useEffect, useRef, useState} from "react";

import flashcardService from "../services/flashcardService";

const Flashcard = ({
  flashcards,
  setFlashcards,
  currentFlashcardIndex, // index
  canEdit,
}) => {
  const [mousePosition, setMousePosition] = useState({
    xAxis: 0,
    yAxis: 0,
  });
  const [transition, setTransition] = useState("none");
  const [flashcard, setFlashcard] = useState(flashcards[0]);
  const [flashcardInputText, setFlashcardInputText] = useState("");
  const [displayingFront, setDisplayingFront] = useState(true);

  useEffect(() => {
    const newFlashcard = flashcards[currentFlashcardIndex];
    setFlashcard(newFlashcard);
    setDisplayingFront(true);
  }, [currentFlashcardIndex]);

  const firstLoad = useRef(true);
  useEffect(() => {
    //dont save flashcard on first load
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    //if switching from edit mode to non-edit mode, save
    if (!canEdit) {
      updateAndSaveFlashcard();
    }
  }, [canEdit]);

  const handleMouseMove = (e) => {
    let xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    setTransition("none");
    setMousePosition({ xAxis, yAxis });
  };

  const handleMouseEnter = () => {
    setTransition("transform .5s ease-out");
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleMouseLeave = () => {
    //console.log('reset', e);
    setTransition("transform .5s ease-out");
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleClick = () => {
    if (!canEdit) {
      //if not in edit mode, flip card
      //flip {displayingFront} to display back
      setDisplayingFront(!displayingFront);
    }
  };

  const styles = {
    transform: `rotateY(${mousePosition.xAxis}deg) rotateX(${mousePosition.yAxis}deg)`,
    transition: transition,
  };

  const handleTextEdit = (e) => {
    if (canEdit) {
      console.log("handling text edit!");
      setFlashcardInputText(e.target.value);
      displayingFront
        ? (flashcard.front = e.target.value)
        : (flashcard.back = e.target.value);
    }
  };

  const updateAndSaveFlashcard = () => {
    console.log("SAVING CHANGES TO FLASHCARD");
    const flashcardToUpdate = flashcards[currentFlashcardIndex];
    const updatedFlashcard = displayingFront
      ? {
          ...flashcardToUpdate,
          front: flashcardInputText || flashcardToUpdate.front,
        }
      : {
          ...flashcardToUpdate,
          back: flashcardInputText || flashcardToUpdate.back,
        };
    flashcardService
      .updateFlashcard(flashcardToUpdate.id, updatedFlashcard)
      .then((updatedFlashcard) => {
        setFlashcards(
          flashcards.map((card) =>
            card.id !== flashcardToUpdate.id ? card : updatedFlashcard
          )
        );
      })
      .catch((er) => console.log(er))
      .then(() => {
        setFlashcardInputText("");
      });
  };
  return (
    <div
      className={"flashcard-container"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flashcard" onClick={handleClick} style={styles}>
        <div className="flex-centering noselect">
          <span className="card-number noselect">
            {Number.parseInt(currentFlashcardIndex) + 1}
          </span>
          <textarea
            type="text"
            className={canEdit ? "flashcard-text" : "flashcard-text noselect"}
            disabled={!canEdit}
            value={displayingFront ? flashcard.front : flashcard.back}
            onChange={handleTextEdit}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
