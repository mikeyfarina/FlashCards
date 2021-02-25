import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from './SidebarHeader.module.css';
import Button from './Button';
import SearchBar from './SearchBar';

const SidebarHeader = ({
  sidebarSearchText,
  setSidebarSearchText,
  handleNewSet,
}) => (
  <div className={css.container}>
    <Button
      text={<FontAwesomeIcon icon={['fa', 'plus']} size="2x" />}
      className={css.create}
      onClick={handleNewSet}
    />
    <SearchBar
      inputText={sidebarSearchText}
      setInputText={setSidebarSearchText}
    />
  </div>
);

export default SidebarHeader;
