import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Image } from '../images/clipart/img1.svg';

const Homepage = ({ flashcardSets, user }) => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);
  const [hideSignup, setHideSignup] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  console.log(scrolling, scrollAmount);

  const homepageStyle = {
    background: 'white',
    height: '90vh',
    width: '100vw',
    overflowY: 'hidden',
    overflowX: 'hidden',
  };
  const containerStyle = {
    height: '75vh',
    width: '100vw',
    margin: '10vh 0 0',
    position: 'relative',
  };

  const collectionStyle = {
    display: 'inline-block',
    background: 'rgba(99, 108, 156, .1)',
    height: '100%',
    width: '100%',
    padding: '0',
    borderRadius: '5px',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
  };
  const setStyle = {
    float: 'left',
    minWidth: '30vw',
    height: '20vh',
    margin: '2.5vh 1.5vw',
    background: 'white',
    zIndex: '1',
    padding: '1% 2%',
    borderRadius: '8px',
    boxShadow: '2px 5px 12px rgb(1, 1, 1, 0.2), 2px 5px 2px rgb(1, 1, 1, 0.1)',
    transition: 'all .1s linear',
    position: 'relative',
    scrollSnapAlign: 'end',
    scrollMarginBottom: '2.5vh',
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
    height: '20%',
    width: '100%',
    zIndex: '0',
  };

  const scrollAction = () => {
    console.log('scrolling: ', scrollAmount);
    containerRef.current.scrollBy({
      top: scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let interval;
    if (scrolling) interval = setInterval(scrollAction, 250);
    return () => clearInterval(interval);
  }, [scrolling]);

  const containerRef = useRef();

  console.log(containerRef);

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
      <div style={containerStyle}>
        <div
          className={'hover_section up'}
          style={{
            ...hoverScrollDivStyle,
            top: '0',
            background:
              'linear-gradient(rgba(0, 0, 0, 0.24) 0%, rgba(99, 108, 156, 0.01) 97%)',
          }}
          onMouseEnter={() => {
            setScrolling(true);
            setScrollAmount(scrollAmount - 20);
          }}
          onMouseLeave={() => {
            setScrolling(false);
            setScrollAmount(0);
          }}
        ></div>
        <div
          className={'collection-container'}
          style={collectionStyle}
          ref={containerRef}
        >
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
                  <h5
                    style={{
                      position: 'absolute',
                      bottom: '18%',
                      right: '4%',
                      color: 'darkgray',
                      fontWeight: 'lighter',
                    }}
                  >
                    Size: <strong>{set.flashcards.length || 0}</strong>
                  </h5>
                  <h5
                    style={{
                      position: 'absolute',
                      bottom: '6%',
                      right: '4%',
                      color: 'darkgray',
                      fontWeight: 'lighter',
                    }}
                  >
                    Created By:{' '}
                    <Link
                      to={`/users/${set.username}`}
                      className={'user-link-from-set'}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <strong>{set.username}</strong>
                    </Link>
                  </h5>
                </div>
              </li>
            ))
          ) : (
            <div>{'Loading Flashcard Sets'}</div>
          )}
        </div>
        <div
          className={'hover_section down'}
          style={{
            ...hoverScrollDivStyle,
            bottom: '0',
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.24) 0%, rgba(99, 108, 156, 0.01) 97%)',
          }}
          onMouseEnter={() => {
            setScrollAmount(scrollAmount + 20);
            setScrolling(true);
          }}
          onMouseLeave={() => {
            setScrollAmount(0);
            setScrolling(false);
          }}
        ></div>
      </div>
    </div>
  );
};

export default Homepage;
