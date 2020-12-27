import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Flashcards from './components/Flashcards';
import Sidebar from './components/Sidebar';
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import flashcardService from './services/flashcardService';

function App() {
  //states
  const [flashcardSets, setFlashcardSets] = useState([
    {
      id: 0,
      title: 'first set',
      flashcards: [
        { id: 'a', front: 'first flashcard', back: 'back of first flashcard' },
        {
          id: 'b',
          front: 'second flashcard',
          back: 'back of second flashcard',
        },
        { id: 'c', front: 'third flashcard', back: 'back of third flashcard' },
        {
          id: 'd',
          front: 'fourth flashcard',
          back: 'back of fourth flashcard',
        },
        { id: 'e', front: 'fifth flashcard', back: 'back of fifth flashcard' },
      ],
    },
  ]);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState(null);

  useEffect(() => {
    console.log(flashcards);
    flashcardService.getAllFlashcards().then((flashcards) => {
      console.log('promise fufilled', flashcards);
      setFlashcards(flashcards);
    });
  }, []);
  console.log(flashcards);

  //if a user is logged in with local storage, re-sign in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedFlashcardAppUser'
    );
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      flashcardService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setCurrentFlashcardIndex(0);
  }, [currentSet]);

  console.log(flashcardSets, currentSet, currentFlashcardIndex);

  const loginFormRef = useRef()
  const loginForm = () => (
    <Togglable buttonLabel='Login' ref={loginFormRef}>
      <LoginForm setUser={setUser} />
    </Togglable>
  )

  const handleLogout = async (event) => {
    event.preventDefault();

    flashcardService.setToken(null);
    window.localStorage.removeItem('loggedFlashcardAppUser');
    setUser(null);
    console.log('logged out');
  };

  const logoutDiv = () => (
    <div>
      <div>{`hello, ${user.username}`}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )

  return (
    <div>
      <header>
        <h1 className="main-title noselect">Flashcards</h1>
        {user ? logoutDiv() : loginForm()}
      </header>
      {!flashcards ? (
        'flashcards loading'
      ) : (
        <div className="main-section">
          <Sidebar
            flashcards={flashcards}
            setFlashcards={setFlashcards}
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            currentSet={currentSet}
            setCurrentSet={setCurrentSet}
            currentFlashcardIndex={currentFlashcardIndex}
            setCurrentFlashcardIndex={setCurrentFlashcardIndex}
          />
          <Flashcards
            flashcards={flashcards}
            setFlashcards={setFlashcards}
            currentSet={currentSet}
            currentFlashcardIndex={currentFlashcardIndex}
            setCurrentFlashcardIndex={setCurrentFlashcardIndex}
          />
        </div>
      )}
    </div>
  );
}

export default App;
