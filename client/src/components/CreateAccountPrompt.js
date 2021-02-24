import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PromptStyle from './CreateAccountPrompt.module.css';
import { ReactComponent as Image } from '../images/clipart/img1.svg';

const CreateAccountPrompt = () => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);

  const signupSectionStyle = {
    height: signupDisplayed ? '55vh' : '0',
    display: signupDisplayed ? 'grid' : 'none',
  };

  return (
    <div className={PromptStyle.container} style={signupSectionStyle}>
      <button
        className={PromptStyle.close}
        onClick={() => {
          setSignupDisplayed(false);
        }}
        type="button"
      >
        x
      </button>
      <div className={PromptStyle.circle} />
      <h2 className={PromptStyle.text}>Sign up to create new flashcards!</h2>
      <Image className={PromptStyle.image} />
      <div
        style={{
          margin: 'auto',
          gridArea: '2/ 1 / 3 / 3',
          display: 'contents',
          minHeight: '0',
        }}
      >
        <Link to="/home/createAccount" className={PromptStyle.signupLink}>
          <button
            className={`${PromptStyle.button} ${PromptStyle.signup}`}
            type="button"
          >
            Sign up
          </button>
        </Link>
        <Link to="/home/login" className={PromptStyle.loginLink}>
          <button
            className={`${PromptStyle.button} ${PromptStyle.login}`}
            type="button"
          >
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;
