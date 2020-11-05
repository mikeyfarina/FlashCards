import react, {useState} from 'react';
import Flashcard from './Flashcard'
import Button from './Button';

const Flashcards = ({flashcards}) => {
  const [displayingFront, setDisplayingFront] = useState(true);

  console.log(flashcards);
  return (
    <div className="flashcards-display">
      <Button text={"\u261a"} className="change-card-button" />
      <Flashcard flashcard={flashcards[0]} displayingFront={displayingFront} setDisplayingFront={setDisplayingFront} />
      <Button text={"\u261b"} className="change-card-button"/>
    </div>
  );
}

export default Flashcards;