import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Image } from '../images/clipart/img1.svg';

const Homepage = ({ flashcardSets, user }) => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);
  const [hideSignup, setHideSignup] = useState(false);

  const homepageStyle = {
    background: 'white',
    height: '90vh',
    width: '100vw',
    overflowY: 'hidden',
    overflowX: 'hidden',
  };
  const collectionStyle = {
    display: 'grid',
    gridTemplateRows: 'repeat(3, 33.33%)',
    gridTemplateColumns: 'repeat(auto, 33.3vw)',
    gridAutoFlow: 'column',
    background: 'rgba(99, 108, 156, .1)',
    height: '80%',
    gridAutoColumns: '33.3vw',
    margin: '5% 0',
    padding: '0',
    borderRadius: '5px',
    overflowX: 'scroll',
    position: 'relative',
  };
  const setStyle = {
    float: 'left',
    minWidth: '90%',
    minHeight: '92%',
    margin: '2% 5%',
    background: 'white',

    padding: '2% 4%',
    borderRadius: '8px',
    boxShadow: '2px 5px 12px rgb(1, 1, 1, 0.2), 2px 5px 2px rgb(1, 1, 1, 0.1)',
    scrollSnapAlign: 'start',
  };

  const signupSectionStyle = {
    width: '100vw',
    height: signupDisplayed ? '55vh' : '0',
    padding: '5% 10%',
    background: '#5da2d5',
    display: hideSignup ? 'none' : 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '5fr 1fr',
    position: 'relative',
    transition: 'all .5s ease-out',
  };
  console.log(flashcardSets);

  const history = useHistory();

  const signupPromptButton = {
    borderRadius: '6px',
    width: '8vw',
    height: '5vh',
    outline: 'none',
    border: 'none',
    fontSize: '1.5vw',
  };

  const signupButton = {
    background: '#f3d250',
    color: 'black',
    marginRight: '10%',
  };

  const loginButton = {
    background: 'rgba(1, 1, 1, 0.05)',
    border: '#ececec 2px solid',
    color: '#ececec',
  };

  const cancelButton = {
    position: 'absolute',
    top: '2%',
    right: '1%',
    padding: '.5%',
    background: '#5da2d5',
    border: 'none',
    fontSize: '1.5vw',
    outline: 'none',
    cursor: 'pointer',
  };

  const hoverScrollDivStyle = {
    position: 'absolute',
    height: '100%',
    width: '15%',
    color: 'lightblue',
  };

  return (
    <div style={homepageStyle}>
      {!user ? (
        <div className={'signup-section'} style={signupSectionStyle}>
          <button
            style={cancelButton}
            onClick={() => {
              setSignupDisplayed(false);
              setTimeout(() => {
                setHideSignup(true);
              }, 1000);
            }}
          >
            x
          </button>
          <h2 style={{ alignSelf: 'center' }}>
            Sign up to create your own collections
          </h2>
          <Image style={{ height: '100%' }} />
          <div
            style={{
              margin: 'auto',
              gridArea: '2/ 1 / 3 / 3',
              display: 'flex',
            }}
          >
            <button style={{ ...signupPromptButton, ...signupButton }}>
              Sign up
            </button>
            <button style={{ ...signupPromptButton, ...loginButton }}>
              Log in
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      <Link
        to="/flashcards"
        style={{ textDecoration: 'none', fontSize: '2vw' }}
      >
        All Flashcards
      </Link>
      <div style={collectionStyle}>
        <div
          className={'hover_section left'}
          style={{ ...hoverScrollDivStyle, left: '0' }}
        ></div>
        {flashcardSets ? (
          flashcardSets.map((set) => (
            <li key={set.id}>
              <div
                className={'user-list-item'}
                style={setStyle}
                onClick={() => {
                  history.push(`/flashcards/${set.id}`);
                }}
              >
                <h2 style={{ marginBottom: '1vh' }}>{set.title}</h2>
                {set.flashcards.map((card, i) => {
                  if (!(i < 3)) return;
                  return (
                    <div key={card.id}>
                      <h5>{card.front}</h5>
                    </div>
                  );
                })}
              </div>
            </li>
          ))
        ) : (
          <div>{'Loading Flashcard Sets'}</div>
        )}
      </div>
      <div
        className={'hover_section right'}
        style={{ ...hoverScrollDivStyle, right: '0' }}
      ></div>
    </div>
  );
};

export default Homepage;
