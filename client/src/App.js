import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import flashcardService from './services/flashcardService';
import setService from './services/setService';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';

import FlashcardsDisplay from './pages/FlashcardsDisplay';
import Homepage from './pages/Homepage';

const App = () => {
  const [user, setUser] = useState(null);
  const [flashcardSets, setFlashcardSets] = useState(null);

  useEffect(async () => {
    const sets = await setService.getAllSets();
    setFlashcardSets(sets);
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

  const logoutDiv = () => (
    <div className="logout-div">
      <div className="user-greeting">{`hello, ${user.username}`}</div>
      <Togglable
        buttonLabel={'\u25BC'}
        ref={userDropdownRef}
        parentDivClassName="user-dropdown"
        cancelButtonText="close"
      >
        <div className="user-dropdown">
          <Link to={`/users/${user.username}/`}>My Account</Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </Togglable>
    </div>
  );

  const linkStyle = { textDecoration: 'none', display: 'contents' };

  return (
    <div>
      <Router>
        <header>
          <Link to={'/home'} style={linkStyle}>
            <div className="main-title-container">
              <h1 className="main-title noselect">Flashcards</h1>
            </div>
          </Link>
          {user ? logoutDiv() : loginForm()}
        </header>
        <Switch>
          <Route path={'/home'}>
            <Homepage flashcardSets={flashcardSets} />
          </Route>
          <Route path={'/users/:id'}></Route>
          <Route path={'/'}>
            <FlashcardsDisplay
              flashcardSets={flashcardSets}
              setFlashcardSets={setFlashcardSets}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
