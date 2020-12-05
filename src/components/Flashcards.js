import react, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import Button from './Button';
import FlashcardTools from './FlashcardTools';
import axios from 'axios';
import flashcardService from '../services/flashcardService';
const Flashcards = ({
  flashcards,
  setFlashcards,
  newCardId,
  setNewCardId,
  currentFlashcard,
  setCurrentFlashcard,
  displayingFront,
  setDisplayingFront,
  flashcardSets,
  currentSet,
}) => {
  const [flashcardInputText, setFlashcardInputText] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  console.log(
    currentSet,
    flashcardSets[currentSet],
    flashcards,
    currentFlashcard
  );

  const handleClick = (e) => {
    console.log('clicked');
    console.log('dir, cc', e, currentFlashcard);
    setDisplayingFront(true);
    if (e.target.innerText === '\u261a') {
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
    e.preventDefault();
    setCanEdit(false);
    setDisplayingFront(true);

    const newFlashcard = {
      id: newCardId,
      front: 'front',
      back: 'back',
    };

    setNewCardId(newCardId + 1);
    flashcardService.createFlashcard(newFlashcard).then((response) => {
      setFlashcards(flashcards.concat(response.data));
      setCurrentFlashcard(flashcards.length);
    });

    console.log(flashcards, currentFlashcard);
  };

  const handleEditFlashCard = (e) => {
    setCanEdit(!canEdit);
    console.log(canEdit);

    const flashcardToUpdate = flashcards[currentFlashcard];
    console.log(flashcardToUpdate);
    const updatedFlashcard = displayingFront
      ? { ...flashcardToUpdate, front: flashcardInputText }
      : { ...flashcardToUpdate, back: flashcardInputText };

    console.log(updatedFlashcard);
    if (canEdit) {
      flashcardService
        .updateFlashcard(flashcardToUpdate.id, updatedFlashcard)
        .then((response) => {
          setFlashcards(
            flashcards.map((card) => (card.id !== id ? card : response.data))
          );
        })
        .catch((er) => console.log(er));
    }
  };

  const handleDeleteFlashCard = (e) => {
    setDisplayingFront(true);
    setCanEdit(false);

    console.log('Delete', currentFlashcard, flashcards);
    const newSet = flashcards.filter((_, i) => i !== currentFlashcard);
    currentFlashcard === 0
      ? setCurrentFlashcard(0)
      : setCurrentFlashcard(currentFlashcard - 1);
    setFlashcards(newSet);
    console.log('After Delete', newSet, currentFlashcard, flashcards);
  };

  return (
    <div className="flashcards-display">
      <FlashcardTools
        amountOfFlashcards={flashcards.length}
        handleNewFlashCard={handleNewFlashCard}
        handleEditFlashCard={handleEditFlashCard}
        handleDeleteFlashCard={handleDeleteFlashCard}
        flashcards={flashcards}
        setCurrentFlashcard={setCurrentFlashcard}
      />
      <div className="flashcard-selection">
        <Button
          onClick={handleClick}
          text={'\u261a'}
          className="change-card-button"
        />
        <Flashcard
          canEdit={canEdit}
          currentFlashcard={currentFlashcard}
          flashcards={flashcards}
          displayingFront={displayingFront}
          setDisplayingFront={setDisplayingFront}
          flashcardInputText={flashcardInputText}
          setFlashcardInputText={setFlashcardInputText}
        />
        <Button
          onClick={handleClick}
          text={'\u261b'}
          className="change-card-button"
        />
      </div>
    </div>
  );
};

export default Flashcards;
