import React, { useState, useEffect, useCallback } from 'react';
import css from './Homepage.module.css';
import CreateAccountPrompt from '../components/CreateAccountPrompt';
import HomepageSet from '../components/HomepageSet';
import setService from '../services/setService';

const Homepage = ({ flashcardSets, user }) => {
  const [searchText, setSearchText] = useState('');
  const [searchSets, setSearchSets] = useState([]);

  const handleChange = useCallback(({ target }) => {
    setSearchText(target.value);
  }, []);

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
    <div className={css.container}>
      {!user && <CreateAccountPrompt />}
      <div className={css.search}>
        <input
          type="text"
          onChange={handleChange}
          className={css.bar}
          placeholder="search flashcard sets..."
        />
      </div>
      <div className={css.display}>
        <div className={css.shape} />

        <div className={css.sets}>
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
