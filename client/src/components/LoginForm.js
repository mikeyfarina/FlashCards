import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import css from './LoginForm.module.css';
import ui from '../styles/ui.module.css';
import flashcardService from '../services/flashcardService';
import loginService from '../services/loginService';
import setService from '../services/setService';
import CreateAccountForm from './CreateAccountForm';

const LoginForm = ({ setUser, standalone }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log('user', user);
      window.localStorage.setItem(
        'loggedFlashcardAppUser',
        JSON.stringify(user)
      );
      flashcardService.setToken(user.token);
      setService.setToken(user.token);
      setUsername('');
      setPassword('');
      setUser(user);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (standalone) {
          history.push('/home');
        }
      }, 3000);
    } catch (ex) {
      setError('Incorrect Username/Password');
      setTimeout(() => {
        setError(null);
      }, 335000);
    }
  };

  const loginFormStyle = {
    gridTemplateRows:
      error || success ? 'repeat(3,1fr) .5fr repear(2, 1fr)' : 'repeat(5,1fr)',
  };

  return (
    <div className={`${css.container} noselect`}>
      {!createAccount ? (
        <form
          className={css.form}
          onSubmit={handleLogin}
          style={loginFormStyle}
        >
          <h3 className={css.title}>Login</h3>
          <input
            type="text"
            className={ui.input}
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
            data-input-username
          />
          <input
            className={ui.input}
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
            data-input-password
          />
          {(error || success) && (
            <div className={css.message}>
              {error && <p className={ui.warning}>{error}</p>}
              {success && (
                <p className={ui.success}>Account created Successfully!</p>
              )}
            </div>
          )}
          <button type="submit" className={ui.button} data-button-submit-login>
            Log in
          </button>
          <button
            className={ui.button}
            onClick={() =>
              standalone
                ? history.push('/home/createAccount')
                : setCreateAccount(true)
            }
            type="button"
          >
            Create Account
          </button>
        </form>
      ) : (
        <CreateAccountForm
          setCreateAccount={setCreateAccount}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default LoginForm;
