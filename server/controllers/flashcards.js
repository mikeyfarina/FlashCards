const flashcardsRouter = require('express').Router();
const Flashcard = require('../models/flashcard');
const User = require('../models/user');

flashcardsRouter.get('/', async (req, res) => {
  const flashcards = await Flashcard.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(flashcards);
});

flashcardsRouter.get('/:id', async (req, res) => {
  const flashcard = await Flashcard.findById(req.params.id);
  if (flashcard) {
    res.json(flashcard);
  } else {
    res.status(404).end();
  }
});

flashcardsRouter.delete('/:id', async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

flashcardsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findById(body.userID);

  if (!user) {
    return;
  }

  const newFlashcard = new Flashcard({
    front: body.front,
    back: body.back,
    date: new Date(),
    userID: user.id,
  });

  const savedFlashcard = await newFlashcard.save();
  console.log(savedFlashcard, user.flashcards);
  user.flashcards = user.flashcards.concat(savedFlashcard._id);
  await user.save();
  res.json(savedFlashcard);
});

flashcardsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const newFlashcard = {
    front: body.front,
    back: body.back,
  };

  const updatedFlashcard = await Flashcard.findByIdAndUpdate(id, newFlashcard, {
    new: true,
  });
  res.json(updatedFlashcard);
});

module.exports = flashcardsRouter;
