import '../styles/CreateAccountPrompt.css';
import React, { useState } from 'react';
import { ReactComponent as Image } from '../images/clipart/img1.svg';
import { Link } from 'react-router-dom';
const CreateAccountPrompt = () => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);

  const signupSectionStyle = {
    width: '100vw',
    height: signupDisplayed ? '55vh' : '0',
    minHeight: '0',
    padding: '2% 6%',
    background: '#5da2d5',
    display: signupDisplayed ? 'grid' : 'none',
    gridTemplateColumns: '1fr 1fr',
    position: 'relative',
    overflow: 'hidden',
  };

  const signupButton = {
    background: '#f3d250',
    color: 'black',
  };

  const loginButton = {
    background: '#5da2d5',
    border: '#ececec 2px solid',
    color: '#ececec',
  };

  const cancelButton = {
    position: 'absolute',
    top: '2%',
    right: '1%',
    padding: '.5%',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5vw',
    outline: 'none',
    cursor: 'pointer',
    zIndex: '1',
  };

  const signupPromptButton = {
    color: 'inherit',
    borderRadius: '6px',
    outline: 'none',
    border: 'none',
    minHeight: '0',
    transition: 'all .25s ease-in',
  };

  return (
    <div className="signup-section" style={signupSectionStyle}>
      <button
        style={cancelButton}
        onClick={() => {
          setSignupDisplayed(false);
        }}
        type="button"
      >
        x
      </button>
      <div className={'circle-separator'} />
      <h2
        className="signup-text noselect"
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          minHeight: '0',
          color: 'white',
        }}
      >
        Sign up to create new flashcards!
      </h2>
      <Image
        className="signup-image"
        style={{
          height: '100%',
          display: 'flex',
          alignSelf: 'center',
          minHeight: '0',
          zIndex: '1',
        }}
      />
      <div
        style={{
          margin: 'auto',
          gridArea: '2/ 1 / 3 / 3',
          display: 'contents',
          minHeight: '0',
        }}
      >
        <Link
          to="/home/createAccount"
          style={{
            justifySelf: 'end',
            alignSelf: 'center',
            marginRight: '1.5vw',
            zIndex: '1',
          }}
        >
          <button
            className="signup-prompt-button"
            style={{ ...signupPromptButton, ...signupButton }}
            type="button"
          >
            Sign up
          </button>
        </Link>
        <Link
          to="/home/login"
          style={{
            justifySelf: 'start',
            alignSelf: 'center',
            marginLeft: '1.5vw',
            zIndex: '1',
          }}
        >
          <button
            className="signup-prompt-button"
            style={{ ...signupPromptButton, ...loginButton }}
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
