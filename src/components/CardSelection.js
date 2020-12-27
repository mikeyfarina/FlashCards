import React, { useState } from 'react';

const CardSelection = ({ flashcards, setCurrentFlashcard }) => {
  const [selectValue, setSelectValue] = useState(0);

  console.log();
  const handleSelect = (e) => {
    console.log(e.target.value);
    setSelectValue(e.target.value);
    setCurrentFlashcard(e.target.value);
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
