import React from 'react';
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
  //TODO: FIX THIS
  const handleNewSet = () => {
    const newSet = {
      title: 'new set',
    };
    setService.createSet(newSet).then(async (newSet) => {
      console.log('set created', newSet);
      await setFlashcardSets(flashcardSets.concat(newSet));
      console.log('added to sets', flashcardSets);
    });
  };

  return (
    <div className="sidebar">
      <SidebarHeader handleNewSet={handleNewSet} />
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
