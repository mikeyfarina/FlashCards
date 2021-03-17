import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import css from './SidebarHeader.module.css';
import SearchBar from './SearchBar';

const plus = ['fa', 'plus'];
const rightArrows = ['fa', 'angle-double-right'];
const leftArrows = ['fa', 'angle-double-left'];
const SidebarHeader = ({
  sidebarSearchText,
  setSidebarSearchText,
  handleNewSet,
  sidebarDisplay,
  setSidebarDisplay,
}) => {
  const handleExpandSet = () => {
    setSidebarDisplay(!sidebarDisplay);
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
      <div className={cn(css.expandContainer)}>
        <button
          className={cn(css.expand)}
          onClick={handleExpandSet}
          type="button"
        >
          {sidebarDisplay ? (
            <FontAwesomeIcon icon={leftArrows} />
          ) : (
            <FontAwesomeIcon icon={rightArrows} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
