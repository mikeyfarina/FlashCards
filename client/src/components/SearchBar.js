import React from 'react';
import SearchStyles from './SearchBar.module.css';

const SearchBar = ({ inputText, setInputText }) => {
  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className={SearchStyles.container}>
      <input
        className={SearchStyles.input}
        onChange={inputChangeHandler}
        value={inputText}
        type="text"
        placeholder="Search Set Titles..."
      />
    </div>
  );
};

export default SearchBar;
