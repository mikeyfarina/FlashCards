import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import SearchBar from './SearchBar';

const SidebarHeader = ({
  sidebarSearchText,
  setSidebarSearchText,
  handleNewSet,
}) => (
  <div className="sidebar__header">
    <Button
      text={<FontAwesomeIcon icon={['fa', 'plus']} size="2x" />}
      className="new-set-button"
      onClick={handleNewSet}
    />
    <SearchBar
      inputText={sidebarSearchText}
      setInputText={setSidebarSearchText}
    />
  </div>
);

export default SidebarHeader;
