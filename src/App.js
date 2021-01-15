import './App.css';

import React, { useEffect, useRef, useState } from 'react';

import Flashcards from './components/Flashcards';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import Togglable from './components/Togglable';
import flashcardService from './services/flashcardService';
import setService from './services/setService';

function App() {
  // states
  const [flashcardSets, setFlashcardSets] = useState(null);
  const [currentSet, setCurrentSet] = useState(0);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const sets = await setService.getAllSets();
    console.log(sets);
    setFlashcardSets(sets);
  }, [flashcards]);

  useEffect(async () => {
    const sets = await setService.getAllSets();
    const setID = sets[currentSet].id;
    const flashcards = await setService.getAllFlashcardsInSet(setID);
    setFlashcards(flashcards);
  }, [currentSet]);

  // if a user is logged in with local storage, re-sign in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedFlashcardAppUser'
    );
    if (loggedUserJSON) {
      console.log('logging in user');
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      flashcardService.setToken(user.token);
      setService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    setCurrentFlashcardIndex(0);
  }, [currentSet]);

  const loginFormRef = useRef();
  const loginForm = () => (
    <Togglable
      buttonLabel="login"
      ref={loginFormRef}
      parentDivClassName="login-div"
    >
      <LoginForm setUser={setUser} />
    </Togglable>
  );

  const handleLogout = (event) => {
    event.preventDefault();

    flashcardService.setToken(null);
    window.localStorage.removeItem('loggedFlashcardAppUser');
    setUser(null);
  };

  const logoutDiv = () => (
    <div className="logout-div">
      <div className="user-greeting">{`hello, ${user.username}`}</div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
  return (
    <div>
      <header>
        <h1 className="main-title noselect">Flashcards</h1>
        {user ? logoutDiv() : loginForm()}
      </header>
      {!flashcardSets || !flashcards ? (
        'flashcards loading...'
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
            flashcardSets={flashcardSets}
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
