import './styles/global.css';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import cn from 'classnames';
import css from './styles/Header.module.css';
import FlashcardsDisplay from './pages/FlashcardsDisplay';
import Homepage from './pages/Homepage';
import UserInformation from './pages/UserInformation';
import flashcardService from './services/flashcardService';
import setService from './services/setService';
import ToggleLogin from './components/ToggleLogin';
import LoginForm from './components/LoginForm';
import CreateAccountForm from './components/CreateAccountForm';
import FormContainer from './components/FormContainer';

const App = () => {
  const [user, setUser] = useState(null);
  const [flashcardSets, setFlashcardSets] = useState(null);
  const history = useHistory();

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
      const userFromLocalStorage = JSON.parse(loggedUserJSON);
      setUser(userFromLocalStorage);
      flashcardService.setToken(userFromLocalStorage.token);
      setService.setToken(userFromLocalStorage.token);
    }
  }, []);

  const loginToggleRef = useRef();
  const loginToggle = () => (
    <ToggleLogin ref={loginToggleRef}>
      <LoginForm setUser={setUser} standalone={false} />
    </ToggleLogin>
  );

  const handleLogout = (event) => {
    event.preventDefault();

    flashcardService.setToken(null);
    window.localStorage.removeItem('loggedFlashcardAppUser');
    setUser(null);
  };

  const logoutDiv = () => (
    <div className={css.logout}>
      <div className={css.greeting}>
        <Link to={`/users/${user.username}/`} className={css.link}>
          {`hello, ${user.username}`}
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className={css.logoutBtn}
        type="button"
        data-logout-button
      >
        Logout
      </button>
    </div>
  );

  const flashcardSetMatch = useRouteMatch('/flashcards/:setId/');
  const setIndex =
    flashcardSetMatch && flashcardSets
      ? flashcardSets.findIndex(
          (set) => set.id === flashcardSetMatch.params.setId
        )
      : 0;

  const goHome = useCallback(() => {
    history.push('/home');
  }, [history]);

  return (
    <div>
      <header>
        <div className={css.titleContainer}>
          <div
            className={cn(css.title, 'noselect')}
            onClick={goHome}
            role="button"
            tabIndex="0"
          >
            <strong>Flashcards</strong>
          </div>
        </div>
        {user ? logoutDiv() : loginToggle()}
      </header>
      <Switch>
        <Route exact path="/home">
          <Homepage flashcardSets={flashcardSets} user={user} />
        </Route>
        <Route path="/home/login">
          <FormContainer>
            <LoginForm setUser={setUser} standalone />
          </FormContainer>
        </Route>
        <Route path="/home/createAccount">
          <FormContainer>
            <CreateAccountForm standalone />
          </FormContainer>
        </Route>
        <Route exact path="/users/:username">
          <UserInformation loggedInUser={user} />
        </Route>
        <Route path="/flashcards/:setId/:flashcardId">
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            desiredSetIndex={setIndex}
            loggedInUser={user}
          />
        </Route>
        <Route path="/flashcards/:id">
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            desiredSetIndex={setIndex}
            loggedInUser={user}
          />
        </Route>
        <Route path="/flashcards">
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            loggedInUser={user}
          />
        </Route>
        <Route exact path="/">
          <FlashcardsDisplay
            flashcardSets={flashcardSets}
            setFlashcardSets={setFlashcardSets}
            loggedInUser={user}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
