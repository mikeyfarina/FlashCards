import React, { useState } from 'react';

import Button from './Button';
import Form from './Form';

const SidebarHeader = ({ handleNewSet }) => {
  const [sidebarSearchText, setSidebarSearchText] = useState('');

  return (
    <div className="sidebar__header">
      <Button text={'+'} className={'new-set-button'} onClick={handleNewSet} />
      <Form
        className="search-bar"
        inputText={sidebarSearchText}
        setInputText={setSidebarSearchText}
      />
    </div>
  );
};

export default SidebarHeader;
