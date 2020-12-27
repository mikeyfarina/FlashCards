const Flashcard = require('../models/flashcard');
const initialFlashcards = [
  {
    front : 'first flashcard',
    back : 'back of first flashcard',
  },
  {
    front : 'second flashcard',
    back : 'back of second flashcard',
  },
  {
    front : 'third flashcard',
    back : 'back of third flashcard',
  },
  {
    front : 'fourth flashcard',
    back : 'back of fourth flashcard',
  },
  {
    front : 'fifth flashcard',
    back : 'back of fifth flashcard',
  },
];

const nonExistingId = async () => {
  const flashcard = new Flashcard({front : 'temp', back : 'btemp'});
  await flashcard.save();
  await flashcard.remove();

  return flashcard._id.toString();
};

const flashcardsInDb = async () => {
  const flashcard = await Flashcard.find({});
  return flashcard.map((card) => card.toJSON());
};

module.exports = {
  initialFlashcards,
  nonExistingId,
  flashcardsInDb,
};
