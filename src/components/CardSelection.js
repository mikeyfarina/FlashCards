import React, { useState } from 'react';

const CardSelection = ({ flashcards, setCurrentFlashcardIndex }) => {
  const [selectValue, setSelectValue] = useState(0);

  console.log();
  const handleSelect = (e) => {
    console.log(e.target.value);
    setSelectValue(e.target.value);
    setCurrentFlashcardIndex(Number(e.target.value));
  };
  return (
    <div className="tools__card-selection">
      <select onChange={handleSelect} value={selectValue}>
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
