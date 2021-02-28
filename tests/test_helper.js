const Flashcard = require('../models/flashcard');
const Set = require('../models/set');
const User = require('../models/user');

let token;

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
    date: new Date(),
  },
  {
    front: 'second flashcard',
    back: 'back of second flashcard',
    date: new Date(),
  },
  {
    front: 'third flashcard',
    back: 'back of third flashcard',
    date: new Date(),
  },
  {
    front: 'fourth flashcard',
    back: 'back of fourth flashcard',
    date: new Date(),
  },
  {
    front: 'fifth flashcard',
    back: 'back of fifth flashcard',
    date: new Date(),
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
  const setsFromDb = await Set.find({});
  return setsFromDb.map((set) => set.toJSON());
};

const createAccount = async (newUserInfo) => {
  // login and set token
  const user = new User(newUserInfo);
  const savedUser = await user.save();
  return savedUser;
};

module.exports = {
  initialSets,
  initialFlashcards,
  nonExistingId,
  flashcardsInDb,
  setsInDb,
  createAccount,
};
