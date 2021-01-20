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
  currentSetIndex,
  setCurrentSetIndex,
  currentFlashcardIndex,
  setCurrentFlashcardIndex,
}) => {
  const [sidebarSearchText, setSidebarSearchText] = useState('');

  useEffect(() => {
    setSidebarSearchText('');
  }, [currentSetIndex]);

  const handleNewSet = () => {
    const newSet = {
      title: 'new set',
    };
    setService.createSet(newSet).then(async (newSet) => {
      await setFlashcardSets(flashcardSets.concat(newSet));
      console.log('added to sets', flashcardSets);
    });
  };

  return (
    <div className="sidebar">
      <SidebarHeader
        sidebarSearchText={sidebarSearchText}
        setSidebarSearchText={setSidebarSearchText}
        handleNewSet={handleNewSet}
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
      />
      <div className="sidebar__bottom"></div>
    </div>
  );
};

export default Sidebar;
