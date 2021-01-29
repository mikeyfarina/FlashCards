import '../App.css';

import React, { useEffect, useState } from 'react';

import Flashcards from '../components/Flashcards';
import Sidebar from '../components/Sidebar';

import setService from '../services/setService';

const FlashcardsDisplay = ({ flashcardSets, setFlashcardSets, setIndex }) => {
  // states
  const [currentSetIndex, setCurrentSetIndex] = useState(setIndex || 0);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState(null);

  useEffect(() => {}, [setIndex]);
  useEffect(async () => {
    setFlashcards(null);
    const sets = await setService.getAllSets();
    setFlashcardSets(sets);
    const setID = sets[currentSetIndex].id;
    const flashcards = await setService.getAllFlashcardsInSet(setID);
    setFlashcards(flashcards);
  }, [currentSetIndex]);

  return (
    <div>
      <div className="main-section">
        <Sidebar
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          flashcardSets={flashcardSets}
          setFlashcardSets={setFlashcardSets}
          currentSetIndex={currentSetIndex}
          setCurrentSetIndex={setCurrentSetIndex}
          currentFlashcardIndex={currentFlashcardIndex}
          setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        />
        <Flashcards
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          flashcardSets={flashcardSets}
          currentSetIndex={currentSetIndex}
          currentFlashcardIndex={currentFlashcardIndex}
          setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        />
      </div>
    </div>
  );
};

export default FlashcardsDisplay;
