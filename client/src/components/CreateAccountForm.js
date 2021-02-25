import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import css from './CreateAccountForm.module.css';
import ui from '../styles/ui.module.css';
import loginService from '../services/loginService';
import userService from '../services/userService';
import setService from '../services/setService';
import flashcardService from '../services/flashcardService';

const CreateAccountForm = ({ setCreateAccount, setUser, standalone }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    type: null,
    message: null,
  });
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleError = (type, message) => {
    setError({
      ...error,
      type,
      message,
    });
    setTimeout(() => {
      setError({
        ...error,
        type: null,
        message: null,
      });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      handleError('nameRequired', 'Name is required');
    } else if (username === '') {
      handleError('usernameRequired', 'Username is required');
    } else if (password === '') {
      handleError('passwordRequired', 'Password is required');
    } else if (password !== confirmPassword) {
      handleError('passwordMismatch', 'Passwords do not match');
    } else {
      userService.createAccount({ username, password, name }).then((result) => {
        // eslint-disable-next-line no-underscore-dangle
        if (result.errors && result._message === 'User validation failed') {
          handleError('accountCreationError', 'Username already taken');
        } else {
          setSuccess(true);
          loginService.login({ username, password }).then((authUser) => {
            setUser(authUser);
            // eslint-disable-next-line no-undef
            window.localStorage.setItem(
              'loggedFlashcardAppUser',
              JSON.stringify(authUser)
            );
            flashcardService.setToken(authUser.token);
            setService.setToken(authUser.token);
            history.push(`/users/${authUser.username}`);
          });
          setTimeout(() => {
            setCreateAccount(false);
            setSuccess(false);
          }, 3000);
        }
      });
    }
  };

  const createAccountGridStyle = {
    gridTemplateRows:
      error.message || success
        ? '1fr 4fr .5fr 1fr .5fr 1fr'
        : '1fr 4fr 1fr 1fr',
  };

  return (
    <>
      <form className={css.container} style={createAccountGridStyle}>
        <h3>Create Account</h3>
        <div className={css.grid}>
          <input
            type="text"
            className={
              error.type === 'nameRequired'
                ? `${ui.input} ${css.error}`
                : `${ui.input}`
            }
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
            placeholder="name"
          />
          <input
            type="text"
            className={
              error.type === 'usernameRequired'
                ? `${ui.input} ${css.error}`
                : `${ui.input}`
            }
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
          />
          <input
            className={
              error.type === 'passwordRequired'
                ? `${ui.input} ${css.error}`
                : `${ui.input}`
            }
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
          />
          <input
            className={
              password !== confirmPassword
                ? `${ui.input} ${css.error}`
                : `${ui.input}`
            }
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => setConfirmPassword(target.value)}
            placeholder="confirm password"
          />
        </div>
        <>
          {error.message && <p className={ui.warning}>{error.message}</p>}
          {success && (
            <p className={ui.success}>Account created Successfully!</p>
          )}
          <button type="submit" className={ui.button} onClick={handleSubmit}>
            Create Account
          </button>
        </>
        <p className={css.reminder}>Already have an account?</p>
        <button
          type="button"
          className={ui.button}
          onClick={(e) => {
            e.stopPropagation();
            if (standalone) history.push('/home/login');
            else setCreateAccount(false);
          }}
        >
          Log in
        </button>
      </form>
    </>
  );
};

export default CreateAccountForm;
