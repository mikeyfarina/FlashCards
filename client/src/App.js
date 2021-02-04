import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import FlashcardsDisplay from './pages/FlashcardsDisplay';
import Homepage from './pages/Homepage';
import UserInformation from './pages/UserInformation';

import flashcardService from './services/flashcardService';
import setService from './services/setService';

import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [flashcardSets, setFlashcardSets] = useState(null);

  useEffect(() => {
    async function setSets() {
      const sets = await setService.getAllSets();
      setFlashcardSets(sets);
    }
    setSets();
  }, []);

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

  const userDropdownRef = useRef();

  const dropdownStyle = {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    height: '4.5vh',
  };

  const logoutDiv = () => (
    <div className="logout-div" style={{ position: 'relative' }}>
      <div className="user-greeting">
        <Link
          to={`/users/${user.username}/`}
          style={{ textDecoration: 'none', outline: 'none' }}
        >
          {`hello, ${user.username}`}
        </Link>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );

  const flashcardSetMatch = useRouteMatch('/flashcards/:id');
  const setIndex =
    flashcardSetMatch && flashcardSets
      ? flashcardSets.findIndex((set) => set.id === flashcardSetMatch.params.id)
      : 0;

  return (
    <div>
      <header>
        <div className="main-title-container">
          <Link
            to="/home"
            style={{ textDecoration: 'none', display: 'contents' }}
          >
            <h1 className="main-title noselect">Flashcards</h1>
          </Link>
        </div>
        {user ? logoutDiv() : loginForm()}
      </header>
      <Switch>
        <Route exact path={'/home'}>
          <Homepage flashcardSets={flashcardSets} user={user} />
        </Route>
        <Route exact path={'/users/:username'}>
          <UserInformation />
        </Route>
        <Route path={'/flashcards/:id'}>
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            desiredSetIndex={setIndex}
          />
        </Route>
        <Route path={'/flashcards'}>
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
          />
        </Route>
        <Route exact path={'/'}>
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
          />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
