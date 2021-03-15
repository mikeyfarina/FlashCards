import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import css from './SidebarHeader.module.css';
import SearchBar from './SearchBar';

const plus = ['fa', 'plus'];
const SidebarHeader = ({
  sidebarSearchText,
  setSidebarSearchText,
  handleNewSet,
}) => (
  <div className={css.container}>
    {!sidebarSearchText && (
      <button
        className={cn(css.create, {})}
        onClick={handleNewSet}
        type="button"
      >
        New Set
        <FontAwesomeIcon icon={plus} size="2x" />
      </button>
    )}

    <SearchBar
      inputText={sidebarSearchText}
      setInputText={setSidebarSearchText}
    />
  </div>
);

export default SidebarHeader;
