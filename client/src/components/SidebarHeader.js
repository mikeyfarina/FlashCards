import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import css from './SidebarHeader.module.css';
import SearchBar from './SearchBar';

const plus = ['fa', 'plus'];
const leftArrows = ['fa', 'angle-double-left'];
const SidebarHeader = ({
  sidebarSearchText,
  setSidebarSearchText,
  handleNewSet,
  sidebarDisplayed,
  setSidebarDisplayed,
}) => {
  const handleExpandSet = () => {
    setSidebarDisplayed(!sidebarDisplayed);
  };

  return (
    <div className={css.container}>
      {!sidebarSearchText && (
        <button className={cn(css.create)} onClick={handleNewSet} type="button">
          New Set
          <FontAwesomeIcon icon={plus} size="2x" />
        </button>
      )}

      <SearchBar
        inputText={sidebarSearchText}
        setInputText={setSidebarSearchText}
      />
      <button
        className={cn(css.expand)}
        onClick={handleExpandSet}
        type="button"
      >
        <FontAwesomeIcon icon={leftArrows} />
      </button>
    </div>
  );
};

export default SidebarHeader;
