import '../styles/PagesStyles.css';
import '../styles/Homepage.css';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CreateAccountPrompt from '../components/CreateAccountPrompt';

import setService from '../services/setService';

const Homepage = ({ flashcardSets, user }) => {
  const [searchText, setSearchText] = useState('');
  const [searchSets, setSearchSets] = useState([]);

  const homepageStyle = {
    background: 'white',
    width: '100vw',
    overflowY: 'hidden',
    overflowX: 'hidden',
  };

  const searchContainerStyle = {
    height: '8vh',
    boxShadow: '0 0 20px rgb(0 0 0 / 33%), 0 0 22px rgb(0 0 0 / 20%)',
  };

  const SearchInputStyle = {
    margin: '1vh 10%',
    fontSize: '1.6vw',
    border: '3px #ececec solid',
    borderRadius: '5px',
    fontFamily: 'inherit',
    padding: '0 1%',
  };

  const containerStyle = {
    height: '82vh',
    width: '100vw',
    position: 'relative',
    oveflow: 'hidden',
  };

  const backgroundShapeStyle = {
    clipPath: 'polygon(100% 33%, 0px 100%, 100% 100%)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(0deg, #ececef, white, #ececec 100%)',
  };
  const collectionStyle = {
    display: 'inline-block',
    height: '100%',
    width: '100%',
    padding: '0',
    borderRadius: '5px',
    scrollSnapType: 'y',
  };
  const setStyle = {
    float: 'left',
    height: '20vh',
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
    height: '10%',
    width: '20%',
    zIndex: '0',
    background: 'black',
  };

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

  return (
    <div className={'homepage-container'} style={homepageStyle}>
      {!user && <CreateAccountPrompt />}
      <div style={searchContainerStyle}>
        <input
          type="text"
          onChange={({ target }) => {
            setSearchText(target.value);
          }}
          className="homepage__search"
          style={SearchInputStyle}
          placeholder="search flashcard sets..."
        />
      </div>
      <div style={containerStyle}>
        <div style={backgroundShapeStyle}></div>
        <div
          style={{
            height: '100%',
            overflowY: 'scroll',
          }}
        >
          <div style={collectionStyle}>
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
                      }}
                    >
                      {set.title}
                    </h2>
                    <div style={{ maxHeight: '9vh', overflow: 'scroll' }}>
                      {set.flashcards.map((card, i) => {
                        if (i > 3) return;
                        return (
                          <div
                            key={card.id}
                            style={{
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: '1',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              maxWidth: '80%',
                              padding: '.5%',
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
                      {set.flashcards.length > 3 && (
                        <h5 className={'show-more-options'}>...</h5>
                      )}
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
