import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
      return;
    } else if (username === '') {
      handleError('usernameRequired', 'Username is required');
      return;
    } else if (password === '') {
      handleError('passwordRequired', 'Password is required');
      return;
    } else if (password !== confirmPassword) {
      handleError('passwordMismatch', 'Passwords do not match');
      return;
    } else {
      userService.createAccount({ username, password, name }).then((result) => {
        if (result.errors && result._message === 'User validation failed') {
          handleError('accountCreationError', 'Username already taken');
        } else {
          setSuccess(true);
          loginService.login({ username, password }).then((authUser) => {
            setUser(authUser);
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

  const inputsStyle = {
    display: 'grid',
    gridTemplateRows: 'repeat(4, 1fr)',
  };

  return (
    <div style={{ display: 'contents' }}>
      <form className={'create-account-form'} style={createAccountGridStyle}>
        <h3>Create Account</h3>
        <div style={inputsStyle}>
          <input
            type="text"
            className={
              error.type === 'nameRequired'
                ? 'login-form-input error'
                : 'login-form-input'
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
                ? 'login-form-input error'
                : 'login-form-input'
            }
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
          />
          <input
            className={
              error.type === 'passwordRequired'
                ? 'login-form-input error'
                : 'login-form-input'
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
                ? 'login-form-input error'
                : 'login-form-input '
            }
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => setConfirmPassword(target.value)}
            placeholder="confirm password"
          />
        </div>
        <div style={{ display: 'contents' }}>
          {error.message && <p className={'error-message'}>{error.message}</p>}
          {success && (
            <p className={'success'}>Account created Successfully!</p>
          )}
          <button
            type="submit"
            className="login-form-button"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
        <p style={{ marginTop: 'auto' }}>Already have an account?</p>
        <button
          type="button"
          className="login-form-button"
          onClick={(e) => {
            e.stopPropagation();
            standalone ? history.push('/home/login') : setCreateAccount(false);
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
