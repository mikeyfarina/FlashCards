import React from 'react';

const CardSelection = ({
  flashcards,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const handleSelect = (e) => {
    setCurrentFlashcardIndex(Number(e.target.value));
  };

  console.log(currentFlashcardIndex);
  return (
    <div className="tools__card-selection">
      <select onChange={handleSelect} value={currentFlashcardIndex}>
        {flashcards.map((card, i) => (
          <option key={Math.random(35) * 6} value={i}>
            {i + 1 + ': ' + card.front}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardSelection;
