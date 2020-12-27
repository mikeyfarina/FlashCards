import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import Button from './Button';
import FlashcardTools from './FlashcardTools';
import axios from 'axios';
import flashcardService from '../services/flashcardService';
import { getNodeText } from '@testing-library/react';
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
      front: 'front',
      back: 'back',
    };

    setNewCardId(newCardId + 1);
    flashcardService.createFlashcard(newFlashcard).then((newFlashcard) => {
      setFlashcards(flashcards.concat(newFlashcard));
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
      ? {
          ...flashcardToUpdate,
          front: flashcardInputText || flashcardToUpdate.front,
        }
      : {
          ...flashcardToUpdate,
          back: flashcardInputText || flashcardToUpdate.back,
        };

    console.log(updatedFlashcard);
    if (canEdit) {
      flashcardService
        .updateFlashcard(flashcardToUpdate.id, updatedFlashcard)
        .then((updatedFlashcard) => {
          setFlashcards(
            flashcards.map((card) => (card.id !== id ? card : updatedFlashcard))
          );
        })
        .catch((er) => console.log(er))
        .then(() => {
          setFlashcardInputText('');
        });
    }
  };

  const handleDeleteFlashCard = (e) => {
    setDisplayingFront(true);
    setCanEdit(false);

    const flashcardToUpdate = flashcards[currentFlashcard];
    flashcardService
      .deleteFlashcard(flashcardToUpdate.id)
      .then(() => {
        console.log('deleted');
        currentFlashcard === 0
          ? setCurrentFlashcard(0)
          : setCurrentFlashcard(currentFlashcard - 1);
        //updates front end as well not sure if best practice
        const newSet = flashcards.filter((_, i) => i !== currentFlashcard);
        setFlashcards(newSet);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log('After Delete', currentFlashcard, flashcards);
  };

  /*
  const handleDeleteFlashCard = (e) => {
    setDisplayingFront(true);
    setCanEdit(false);

    console.log('Delete', currentFlashcard, flashcards);
    
    setFlashcards(newSet);
    console.log('After Delete', newSet, currentFlashcard, flashcards);
  };
  */

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
