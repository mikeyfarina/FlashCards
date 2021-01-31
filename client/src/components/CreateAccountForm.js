import React, { useState } from 'react';
import userService from '../services/userService';
const CreateAccountForm = ({ setCreateAccount }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    type: null,
    message: null,
  });

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
      userService
        .createAccount({ username, password, name })
        .catch((err) => {
          console.log(err);
        })
        .then(() => setCreateAccount(false));
    }
  };

  const createAccountGridStyle = {
    gridTemplateRows: error.message
      ? 'repeat(4, 1fr) 0.5fr 0.5fr repeat(2, 1fr)'
      : 'repeat(5, 1fr) 0.5fr 1fr',
  };

  console.log(error);

  return (
    <div className={'login noselect'}>
      <form className={'create-account-form'} style={createAccountGridStyle}>
        <h3>Create Account</h3>
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
        {error.message ? (
          <p className={'error-message'}>{error.message}</p>
        ) : (
          ''
        )}
        <button
          type="submit"
          className="login-form-button"
          onClick={handleSubmit}
        >
          Create
        </button>
        <p style={{ marginTop: 'auto' }}>Already have an account?</p>
        <button
          className="login-form-button"
          onClick={() => setCreateAccount(false)}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
