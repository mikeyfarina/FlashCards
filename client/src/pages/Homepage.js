import '../styles/PagesStyles.css';
import '../styles/Homepage.css';

import React, { useState, useEffect } from 'react';
import CreateAccountPrompt from '../components/CreateAccountPrompt';
import HomepageSet from '../components/HomepageSet';

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
    scrollSnapType: 'y proximity',
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
      <div className="flashcard-collections-container">
        <div style={backgroundShapeStyle}></div>
        <div
          style={{
            height: '100%',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            padding: '1% 0',
          }}
        >
          <div style={collectionStyle}>
            {searchSets ? (
              searchSets.map((set) => (
                <li key={set.id}>
                  <HomepageSet set={set} />
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
