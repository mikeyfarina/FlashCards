import React, { useState } from 'react';
import { ReactComponent as Image } from '../images/clipart/img1.svg';
import { Link } from 'react-router-dom';
const CreateAccountPrompt = () => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);
  const [hideSignup, setHideSignup] = useState(false);

  const signupSectionStyle = {
    width: '100vw',
    height: signupDisplayed ? '55vh' : '0',
    minHeight: '0',
    padding: '2% 6%',
    background: '#5da2d5',
    display: hideSignup ? 'none' : 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '5fr 1fr',
    position: 'relative',
    transition: 'all .5s ease-out',
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
    height: signupDisplayed ? '5vh' : '0',
    width: '8vw',
    color: signupDisplayed ? 'inherit' : 'transparent',
    borderRadius: '6px',
    outline: 'none',
    border: 'none',
    fontSize: '1.5vw',
    minHeight: '0',
    transition: 'all .25s ease-in',
  };

  return (
    <div className={'signup-section'} style={signupSectionStyle}>
      <button
        style={cancelButton}
        onClick={() => {
          setSignupDisplayed(false);
          setTimeout(() => {
            setHideSignup(true);
          }, 250);
        }}
      >
        x
      </button>
      <div
        style={{
          top: '-50%',
          height: ' 115vh',
          position: 'absolute',
          right: '-30%',
          borderRadius: '100%',
          width: '115vh',
          background: 'white',
          zIndex: '0',
        }}
      ></div>
      <h2
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
        style={{
          height: '100%',
          display: 'flex',
          justifySelf: 'end',
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
          to={'/home/createAccount'}
          style={{
            justifySelf: 'end',
            alignSelf: 'center',
            marginRight: '1.5vw',
          }}
        >
          <button style={{ ...signupPromptButton, ...signupButton }}>
            Sign up
          </button>
        </Link>
        <Link
          to={'/home/login'}
          style={{
            justifySelf: 'start',
            alignSelf: 'center',
            marginLeft: '1.5vw',
            zIndex: '1',
          }}
        >
          <button style={{ ...signupPromptButton, ...loginButton }}>
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;
