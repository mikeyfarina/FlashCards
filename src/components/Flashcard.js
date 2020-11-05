import react from 'react';

const Flashcard = ({flashcard, displayingFront, setDisplayingFront}) => {
  console.log(flashcard);
  const handleClick = () => {
    setDisplayingFront(!displayingFront); //flip displayingFront to display back
    console.log("click", displayingFront);
  }

  return (
    <div className="flashcard-container">
      <div className="flashcard" onClick={() => handleClick()}>
        <div className="flex-centering">
          <h2 className="flashcard-text noselect" >
            {displayingFront ? flashcard.front : flashcard.back}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;