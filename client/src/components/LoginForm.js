import PropTypes from 'prop-types';
import React, { useState } from 'react';

import flashcardService from '../services/flashcardService';
import loginService from '../services/loginService';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      console.log(user.username, 'logged in');
      setUsername('');
      setPassword('');
      setUser(user);
    } catch (ex) {
      console.log('wrong credentials');
    }
  };

  return (
    <div className={'login noselect'}>
      <h3>Login</h3>
      <form className={'login-form'} onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          placeholder="username"
        />
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="password"
        />
        <button type="submit" className="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
