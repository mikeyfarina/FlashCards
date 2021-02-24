import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateAccStyle from './CreateAccountForm.module.css';
import LoginFormStyles from './LoginForm.module.css';
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
      <form className={CreateAccStyle.container} style={createAccountGridStyle}>
        <h3>Create Account</h3>
        <div className={CreateAccStyle.grid}>
          <input
            type="text"
            className={
              error.type === 'nameRequired'
                ? `${CreateAccStyle.input} ${CreateAccStyle.error}`
                : `${CreateAccStyle.input}`
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
                ? `${CreateAccStyle.input} ${CreateAccStyle.error}`
                : `${CreateAccStyle.input}`
            }
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
          />
          <input
            className={
              error.type === 'passwordRequired'
                ? `${CreateAccStyle.input} ${CreateAccStyle.error}`
                : `${CreateAccStyle.input}`
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
                ? `${CreateAccStyle.input} ${CreateAccStyle.error}`
                : `${CreateAccStyle.input}`
            }
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={({ target }) => setConfirmPassword(target.value)}
            placeholder="confirm password"
          />
        </div>
        <>
          {error.message && (
            <p className={CreateAccStyle.warning}>{error.message}</p>
          )}
          {success && (
            <p className={CreateAccStyle.success}>
              Account created Successfully!
            </p>
          )}
          <button
            type="submit"
            className={LoginFormStyles.button}
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </>
        <p className={CreateAccStyle.reminder}>Already have an account?</p>
        <button
          type="button"
          className={LoginFormStyles.button}
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
