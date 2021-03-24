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
      const text = searchText.toLowerCase();
      const sets = flashcardSets
        .filter((set) => set.title.toLowerCase().includes(text))
        .sort(
          (a, b) =>
            a.title.toLowerCase().indexOf(text) -
            b.title.toLowerCase().indexOf(text)
        );
      setSearchSets(sets);
    }
  }, [flashcardSets, searchText]);

  return (
    <div>
      {!user && <CreateAccountPrompt />}
      <div className={css.search}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search flashcard sets..."
        />
      </div>
      <div>
        <ul className={css.sets}>
          {searchSets ? (
            searchSets.map((set) => (
              <li key={set.id}>
                <HomepageSet set={set} />
              </li>
            ))
          ) : (
            <li>Loading Flashcard Sets</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
