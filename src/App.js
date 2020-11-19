import React, { useState, useEffect } from "react";
import "./App.css";
import Flashcards from "./components/Flashcards";
import Sidebar from "./components/Sidebar";

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardSets, setFlashcardSets] = useState([
    {
      id: 0,
      title: "first set",
      flashcards: [
        { id: "a", front: "first flashcard", back: "back of first flashcard" },
        {
          id: "b",
          front: "second flashcard",
          back: "back of second flashcard",
        },
        { id: "c", front: "third flashcard", back: "back of third flashcard" },
        {
          id: "d",
          front: "fourth flashcard",
          back: "back of fourth flashcard",
        },
        { id: "e", front: "fifth flashcard", back: "back of fifth flashcard" },
      ],
    },
  ]);
  const [currentSet, setCurrentSet] = useState(0);
  const [newCardId, setNewCardId] = useState(0);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [displayingFront, setDisplayingFront] = useState(true);

  console.log(flashcardSets, currentSet, currentFlashcard);

  const flashcardsOfCurrentSet = flashcardSets[currentSet].flashcards;
  console.log(flashcardSets, flashcards, flashcardsOfCurrentSet);
  return (
    <div>
      <header>
        <h1 className="main-title noselect">Flashcards</h1>
      </header>
      <div className="main-section">
        <Sidebar
          flashcardSets={flashcardSets}
          setFlashcardSets={setFlashcardSets}
          currentSet={currentSet}
          setCurrentSet={setCurrentSet}
          newCardId={newCardId}
          setNewCardId={setNewCardId}
          currentFlashcard={currentFlashcard}
          setCurrentFlashcard={setCurrentFlashcard}
          displayingFront={displayingFront}
          setDisplayingFront={setDisplayingFront}
        />
        <Flashcards
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          newCardId={newCardId}
          setNewCardId={setNewCardId}
          currentFlashcard={currentFlashcard}
          setCurrentFlashcard={setCurrentFlashcard}
          displayingFront={displayingFront}
          setDisplayingFront={setDisplayingFront}
        />
      </div>
    </div>
  );
}

export default App;
