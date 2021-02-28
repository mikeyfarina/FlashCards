import React, { useCallback } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ inputText, setInputText }) => {
  const inputChangeHandler = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div className={css.container}>
      <input
        className={css.input}
        onChange={inputChangeHandler}
        value={inputText}
        type="text"
        placeholder="Search Set Titles..."
      />
    </div>
  );
};

export default SearchBar;
