import React from 'react';
import flashcardService from '../services/flashcardService';
import setService from '../services/setService';
import SetList from './SetList';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({
  flashcards,
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
    setService.createSet(newSet).then((newSet) => {
      console.log('set created', newSet);
      setFlashcardSets(flashcardSets.concat(newSet));
      console.log('added to sets', flashcardSets);
      console.log('creating default flashcards');
      const newFlashcard = {
        front: 'first flashcard of new set',
        back: 'back of flashcard',
        setId: newSet._id,
      };
      flashcardService.createFlashcard(newFlashcard);
    });
  };

  return (
    <div className="sidebar">
      <SidebarHeader handleNewSet={handleNewSet} />
      <SetList
        flashcards={flashcards}
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
