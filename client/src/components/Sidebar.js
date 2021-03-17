import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import css from './Sidebar.module.css';
import setService from '../services/setService';
import SetList from './SetList';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({
  flashcards,
  setFlashcards,
  flashcardSets,
  setFlashcardSets,
  currentSetIndex,
  setCurrentSetIndex,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
  loggedInUser,
  sidebarDisplayed,
  setSidebarDisplayed,
}) => {
  const [sidebarSearchText, setSidebarSearchText] = useState('');

  useEffect(() => {
    setSidebarSearchText('');
  }, [currentSetIndex]);

  const handleNewSet = useCallback(async () => {
    const newSet = {
      title: 'new set',
    };
    const createdSet = await setService.createSet(newSet);
    setFlashcardSets(flashcardSets.concat(createdSet));
  }, [flashcardSets]);

  return (
    <div
      className={cn(
        css.container,
        { [css.open]: sidebarDisplayed },
        { [css.closed]: !sidebarDisplayed }
      )}
    >
      <SidebarHeader
        sidebarSearchText={sidebarSearchText}
        setSidebarSearchText={setSidebarSearchText}
        handleNewSet={handleNewSet}
        sidebarDisplayed={sidebarDisplayed}
        setSidebarDisplayed={setSidebarDisplayed}
      />
      <SetList
        flashcards={flashcards || []}
        setFlashcards={setFlashcards}
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
        currentSetIndex={currentSetIndex}
        setCurrentSetIndex={setCurrentSetIndex}
        currentFlashcardIndex={currentFlashcardIndex}
        setCurrentFlashcardIndex={setCurrentFlashcardIndex}
        sidebarSearchText={sidebarSearchText}
        loggedInUser={loggedInUser}
      />
      <div className={css.bottom} />
    </div>
  );
};

export default Sidebar;
