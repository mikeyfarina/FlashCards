const Flashcard = require('../models/flashcard');
const Set = require('../models/set');

const initialSets = [
  {
    title: 'initial set from backend',
    flashcards: [],
  },
  {
    title: 'second set from initSets',
  },
];

const initialFlashcards = [
  {
    front: 'first flashcard',
    back: 'back of first flashcard',
  },
  {
    front: 'second flashcard',
    back: 'back of second flashcard',
  },
  {
    front: 'third flashcard',
    back: 'back of third flashcard',
  },
  {
    front: 'fourth flashcard',
    back: 'back of fourth flashcard',
  },
  {
    front: 'fifth flashcard',
    back: 'back of fifth flashcard',
  },
];

const nonExistingId = async () => {
  const flashcard = new Flashcard({
    front: 'temp',
    back: 'btemp',
    date: new Date(),
  });
  await flashcard.save();
  await flashcard.remove();

  return flashcard._id.toString();
};

const flashcardsInDb = async () => {
  const flashcard = await Flashcard.find({});
  return flashcard.map((card) => card.toJSON());
};

const setsInDb = async () => {
  const set = await Set.find({});
  return set.map((set) => set.toJSON());
};

module.exports = {
  initialSets,
  initialFlashcards,
  nonExistingId,
  flashcardsInDb,
  setsInDb,
};
