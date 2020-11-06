import "./App.css";

import React, {useState} from "react";

import Flashcards from "./components/Flashcards";
import Form from "./components/Form";

function App() {
  // states
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([
    {
      front : "1this is the front 1this is the front 1this is the front",
      back : "1this is the back 1this is the back 1this is the back",
    },
    {front : "2front", back : "2back"},
    {front : "3front", back : "3back"},
    {front : "4front", back : "4back"},
  ]);

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
      <Flashcards flashcards={flashcards} setFlashcards={setFlashcards} />
    </div>
  );
}

export default App;
