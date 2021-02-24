import '../styles/Homepage.css';
import React, { useState, useEffect } from 'react';
import HomepageStyles from './Homepage.module.css';
import CreateAccountPrompt from '../components/CreateAccountPrompt';
import HomepageSet from '../components/HomepageSet';
import setService from '../services/setService';

const Homepage = ({ flashcardSets, user }) => {
  const [searchText, setSearchText] = useState('');
  const [searchSets, setSearchSets] = useState([]);

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
        .sort(
          (a, b) => a.title.indexOf(searchText) - b.title.indexOf(searchText)
        );
      setSearchSets(sets);
    }
  }, [searchText]);

  return (
    <div className={HomepageStyles.container}>
      {!user && <CreateAccountPrompt />}
      <div className={HomepageStyles.search}>
        <input
          type="text"
          onChange={({ target }) => {
            setSearchText(target.value);
          }}
          className={HomepageStyles.bar}
          placeholder="search flashcard sets..."
        />
      </div>
      <div className={HomepageStyles.display}>
        <div className={HomepageStyles.shape} />

        <div className={HomepageStyles.sets}>
          {searchSets ? (
            searchSets.map((set) => (
              <li key={set.id}>
                <HomepageSet set={set} />
              </li>
            ))
          ) : (
            <div>Loading Flashcard Sets</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
