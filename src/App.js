import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Flashcards from "./components/Flashcards";
import Sidebar from "./components/Sidebar";
function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([
    { front: "first flashcard", back: "back of first flashcard" },
    { front: "second flashcard", back: "back of second flashcard" },
    { front: "third flashcard", back: "back of third flashcard" },
    { front: "fourth flashcard", back: "back of fourth flashcard" },
  ]);
  const [flashcardSets, setFlashcardSets] = useState([
    { title: "first set", flashcards },
    { title: "second set", flashcards },
    { title: "third set", flashcards },
    { title: "fourth set", flashcards },
  ]);
  const [currentSet, setCurrentSet] = useState(0);

  return (
    <div>
      <header>
        <h1 className="main-title noselect">Flashcards</h1>
        <Form
          className="search-bar"
          inputText={inputText}
          setInputText={setInputText}
        />
      </header>
      <div className="main-section">
        <Sidebar
          flashcardSets={flashcardSets}
          setFlashcardSets={setFlashcardSets}
          currentSet={currentSet}
          setCurrentSet={setCurrentSet}
        />
        <Flashcards flashcards={flashcards} setFlashcards={setFlashcards} />
      </div>
    </div>
  );
}

export default App;
