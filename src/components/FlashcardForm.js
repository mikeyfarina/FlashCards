import {createContext} from 'react';

const FlashcardForm = ({createFlashcard}) => {
  const [newFlashcard, setNewFlashcard] = useState({ front: '', back: '' });
  const handleChange = (event) => {
    setNewFlashcard(event.target.value);
  };

  const addFlashcard = (event) => {
    event.preventDefault();
    createFlashcard({
      front: 'ff test',
      back: 'ff back',
    });
    setNewFlashcard('');
  };

  return (
    <div>
      <h2>Create a new flashcard</h2>

      <form onSubmit={addFlashcard}>
        <input value={newFlashcard} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default FlashcardForm;
