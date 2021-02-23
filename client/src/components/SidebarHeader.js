import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import Form from './Form';

const SidebarHeader = ({
  sidebarSearchText,
  setSidebarSearchText,
  handleNewSet,
}) => (
  <div className="sidebar__header">
    <Button
      text={<FontAwesomeIcon icon={['fa', 'plus']} size="2x" />}
      className={'new-set-button'}
      onClick={handleNewSet}
    />
    <Form
      className="search-bar"
      inputText={sidebarSearchText}
      setInputText={setSidebarSearchText}
    />
  </div>
);

export default SidebarHeader;
