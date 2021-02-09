import '../styles/PagesStyles.css';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CreateAccountPrompt from '../components/CreateAccountPrompt';

import setService from '../services/setService';

const Homepage = ({ flashcardSets, user }) => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchSets, setSearchSets] = useState([]);
  const [hover, setHover] = useState(false);

  const homepageStyle = {
    background: 'white',
    height: '90vh',
    width: '100vw',
    overflowY: 'hidden',
    overflowX: 'hidden',
  };
  const containerStyle = {
    height: '82vh',
    width: '100vw',

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
    maxWidth: '30vw',
    height: '20vh',
    margin: '2.5vh 1.4vw',
    background: 'white',
    zIndex: '1',
    padding: '1% 2%',
    borderRadius: '8px',
    boxShadow: '2px 5px 12px rgb(1, 1, 1, 0.2), 2px 5px 2px rgb(1, 1, 1, 0.1)',
    transition: 'all .1s linear',
    position: 'relative',
    scrollSnapAlign: 'start',
    scrollMarginTop: '2.5vh',
    scrollPadding: '8vh',
  };

  const history = useHistory();

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

  useEffect(() => {
    setService.getAllSets().then((sets) => {
      setSearchSets(sets);
    });
  }, []);

  useEffect(() => {
    if (searchText === '') {
      console.log('search empty', flashcardSets);
      setSearchSets(flashcardSets);
    } else {
      const sets = flashcardSets
        .filter((set) => set.title.includes(searchText, 0))
        .sort((a, b) => {
          return a.title.indexOf(searchText) - b.title.indexOf(searchText);
        });
      setSearchSets(sets);
    }
  }, [searchText]);

  const containerRef = useRef();

  console.log(containerRef);

  return (
    <div style={homepageStyle}>
      {!user && <CreateAccountPrompt />}
      <div style={{ height: '8vh' }}>
        <input
          type="text"
          onChange={({ target }) => {
            setSearchText(target.value);
          }}
          className="homepage__search"
          style={{
            margin: '1vh 10%',
            fontSize: '1.6vw',
            border: '3px #ececec solid',
            borderRadius: '5px',
            fontFamily: 'inherit',
            padding: '0 1%',
          }}
          placeholder="search flashcard sets..."
        />
      </div>
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
          {searchSets ? (
            searchSets.map((set) => (
              <li key={set.id}>
                <div
                  className={'user-list-item home-set'}
                  style={setStyle}
                  onClick={() => {
                    history.push(`/flashcards/${set.id}`);
                  }}
                >
                  <h2
                    style={{
                      marginBottom: '1vh',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textDecoration: hover ? 'underline' : 'none',
                    }}
                  >
                    {set.title}
                  </h2>
                  <div style={{ maxHeight: '8vh', overflow: 'scroll' }}>
                    {set.flashcards.map((card, i) => {
                      return (
                        <div
                          key={card.id}
                          style={{
                            webkitBoxOrient: 'vertical',
                            webkitLineClamp: '1',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            maxWidth: '60%',
                          }}
                          className={'home-flashcard-option'}
                          onClick={(e) => {
                            e.stopPropagation();
                            history.push(`/flashcards/${set.id}/${card.id}`);
                          }}
                        >
                          <h5>{card.front}</h5>
                        </div>
                      );
                    })}
                  </div>
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
