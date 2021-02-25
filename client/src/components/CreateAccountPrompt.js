import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from './CreateAccountPrompt.module.css';
import { ReactComponent as Image } from '../images/clipart/img1.svg';

const CreateAccountPrompt = () => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);

  const signupSectionStyle = {
    height: signupDisplayed ? '55vh' : '0',
    display: signupDisplayed ? 'grid' : 'none',
  };

  return (
    <div className={css.container} style={signupSectionStyle}>
      <button
        className={css.close}
        onClick={() => {
          setSignupDisplayed(false);
        }}
        type="button"
      >
        x
      </button>
      <div className={css.circle} />
      <h2 className={css.text}>Sign up to create new flashcards!</h2>
      <Image className={css.image} />
      <div
        style={{
          margin: 'auto',
          gridArea: '2/ 1 / 3 / 3',
          display: 'contents',
          minHeight: '0',
        }}
      >
        <Link to="/home/createAccount" className={css.signupLink}>
          <button className={`${css.button} ${css.signup}`} type="button">
            Sign up
          </button>
        </Link>
        <Link to="/home/login" className={css.loginLink}>
          <button className={`${css.button} ${css.login}`} type="button">
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;
