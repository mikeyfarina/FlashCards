import React, { useEffect, useState } from 'react';
//import flashcardService from '../services/flashcardService';
import setService from '../services/setService';
import SetList from './SetList';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({
  flashcards,
  setFlashcards,
  flashcardSets,
  setFlashcardSets,
  currentSet,
  setCurrentSet,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const [sidebarSearchText, setSidebarSearchText] = useState('');

  useEffect(() => {
    searchTitles();
  }, [sidebarSearchText]);

  const handleNewSet = () => {
    const newSet = {
      title: 'new set',
    };
    setService.createSet(newSet).then(async (newSet) => {
      await setFlashcardSets(flashcardSets.concat(newSet));
      console.log('added to sets', flashcardSets);
    });
  };

  const searchTitles = () => {
    console.log(sidebarSearchText);
  };

  return (
    <div className="sidebar">
      <SidebarHeader
        sidebarSearchText={sidebarSearchText}
        setSidebarSearchText={setSidebarSearchText}
        handleNewSet={handleNewSet}
      />
      <SetList
        flashcards={flashcards}
        setFlashcards={setFlashcards}
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
        currentSet={currentSet}
        setCurrentSet={setCurrentSet}
        currentFlashcardIndex={currentFlashcardIndex}
        setCurrentFlashcardIndex={setCurrentFlashcardIndex}
      />
      <div className="sidebar__bottom"></div>
    </div>
  );
};

export default Sidebar;
