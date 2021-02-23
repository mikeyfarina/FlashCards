import '../styles/FlashcardDisplay.css';
import React, { useEffect, useState } from 'react';
import Flashcards from '../components/Flashcards';
import Sidebar from '../components/Sidebar';
import setService from '../services/setService';
import { useParams } from 'react-router-dom';

const FlashcardsDisplay = ({
  flashcardSets,
  setFlashcardSets,
  desiredSetIndex,
  loggedInUser,
}) => {
  // states
  const [currentSetIndex, setCurrentSetIndex] = useState(desiredSetIndex || 0);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState(null);

  const desiredFlashcardID = useParams().flashcardId;

  useEffect(() => {
    const getFlashcardsWithinSet = async () => {
      setFlashcards(null);
      const sets = await setService.getAllSets();
      setFlashcardSets(sets);
      const setID = sets[currentSetIndex].id;
      const flashcardsInSet = await setService.getAllFlashcardsInSet(setID);
      const desiredFlashcardIndex = flashcardsInSet.findIndex(
        (card) => card.id === desiredFlashcardID
      );
      setCurrentFlashcardIndex(
        desiredFlashcardIndex > 0 ? desiredFlashcardIndex : 0
      );
      setFlashcards(flashcards);
    };
    getFlashcardsWithinSet();
  }, [currentSetIndex, desiredFlashcardID, setFlashcardSets]);

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
          loggedInUser={loggedInUser}
        />
        <Flashcards
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          flashcardSets={flashcardSets}
          currentSetIndex={currentSetIndex}
          currentFlashcardIndex={currentFlashcardIndex}
          setCurrentFlashcardIndex={setCurrentFlashcardIndex}
          loggedInUser={loggedInUser}
        />
      </div>
    </div>
  );
};

export default FlashcardsDisplay;
