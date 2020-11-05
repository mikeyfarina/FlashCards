import React, {useState} from 'react';
import './App.css';
import Form from './components/Form';
import Flashcards from './components/Flashcards'

function App() {
  //states
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([{front: "this is the front", back: "this is the back"}]);
 

  return (
    <div>
      <header>
        <h1>Flashcards</h1>
      </header>
      <Form inputText={inputText} setInputText={setInputText} />
      <Flashcards flashcards={flashcards}/>      
    </div>
  );
}

export default App;
