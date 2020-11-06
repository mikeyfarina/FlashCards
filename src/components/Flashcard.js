import react, {useState} from "react";

const Flashcard = ({
  flashcard,
  displayingFront,
  setDisplayingFront,
  currentFlashcard,
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
    console.log(e);
    let xAxis = -(window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    setTransition("transform .5s ease-out");
    setMousePosition({ xAxis, yAxis });
  };

  const handleMouseLeave = (e) => {
    console.log("reset", e);
    setTransition("transform .5s ease-out");
    setMousePosition({ xAxis: 0, yAxis: 0 });
  };

  const handleClick = () => {
    setDisplayingFront(!displayingFront); //flip displayingFront to display back
    console.log("click", displayingFront);
    console.log(flashcard);
  };

  const styles = {
    transform: `rotateY(${mousePosition.xAxis}deg) rotateX(${mousePosition.yAxis}deg)`,
    transition: transition,
  };

  return (
    <div
      className="flashcard-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flashcard" onClick={handleClick} style={styles}>
        <div className="flex-centering">
          <span className="card-number noselect">{currentFlashcard + 1}</span>
          <h2 className="flashcard-text noselect">
            {displayingFront ? flashcard.front : flashcard.back}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
