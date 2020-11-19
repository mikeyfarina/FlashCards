import react, { useState, useEffect } from "react";

const Flashcard = ({
  flashcard,
  displayingFront,
  setDisplayingFront,
  currentFlashcard, //index
  canEdit,
  newFlashcardText,
  setNewFlashcardText,
}) => {
  const [mousePosition, setMousePosition] = useState({
    xAxis: 0,
    yAxis: 0,
  });
  const [transition, setTransition] = useState("none");

  const handleMouseMove = (e) => {
    let xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    setTransition("none");
    setMousePosition({ xAxis, yAxis });
  };

  const handleMouseEnter = (e) => {
    setTransition("transform .5s ease-out");
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleMouseLeave = (e) => {
    console.log("reset", e);
    setTransition("transform .5s ease-out");
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleClick = () => {
    if (!canEdit) {
      //if not in edit mode, flip card
      //flip {displayingFront} to display back
      setDisplayingFront(!displayingFront);
    } else {
    }

    console.log("click", displayingFront);
    console.log(flashcard);
  };

  const styles = {
    transform: `rotateY(${mousePosition.xAxis}deg) rotateX(${mousePosition.yAxis}deg)`,
    transition: transition,
  };

  const handleTextEdit = (e) => {
    setNewFlashcardText(
      displayingFront
        ? (flashcard.front = e.target.value)
        : (flashcard.back = e.target.value)
    );
    console.log(newFlashcardText);
  };
  return (
    <div
      className={"flashcard-container"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flashcard" onClick={handleClick} style={styles}>
        <div className="flex-centering">
          <span className="card-number noselect">
            {Number.parseInt(currentFlashcard) + 1}
          </span>
          <textarea
            type="text"
            className="flashcard-text noselect"
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
