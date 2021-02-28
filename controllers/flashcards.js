const flashcardsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Flashcard = require('../models/flashcard');
const User = require('../models/user');
const Set = require('../models/set');

flashcardsRouter.get('/', async (req, res) => {
  const flashcards = await Flashcard.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('set', { title: 1 });
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
  console.log(req.token);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token invalid',
    });
  }

  const user = await User.findById(decodedToken.id);
  await user.update({ $pull: { flashcards: req.params.id } });
  await user.save();

  const flashcard = await Flashcard.findById(req.params.id);
  const set = await Set.findById(flashcard.set);
  await set.update({ $pull: { flashcards: req.params.id } });
  await set.save();

  if (flashcard.user.toString() === user.id.toString()) {
    console.log('can delete');
    const deletedFlashcard = await Flashcard.findByIdAndDelete(req.params.id);
    console.log('deleted');
    return res.status(204).json(deletedFlashcard);
  } else {
    console.log('cant delete');
    console.log('wrong user, expected: ', flashcard.user, 'got: ', user.id);
    return res.status(401).end();
  }
});

flashcardsRouter.post('/', async (req, res) => {
  const { body } = req;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token invalid',
    });
  }

  if (!body.setId) {
    return res.status(204).send({
      error: 'Set ID missing',
    });
  }

  const user = await User.findById(decodedToken.id);
  const set = await Set.findById(body.setId);

  console.log('ids for post', user, set);

  if (user.id.toString() !== set.user.toString()) {
    return res.status(401).json({
      error: 'cant create flashcards in other users sets',
    });
  }

  const newFlashcard = new Flashcard({
    front: body.front,
    back: body.back,
    set: set.id,
    date: new Date(),
    user: user.id,
  });

  const savedFlashcard = await newFlashcard.save();
  user.flashcards = user.flashcards.concat(savedFlashcard._id);
  await user.save();

  set.flashcards = set.flashcards.concat(savedFlashcard._id);
  await set.save();

  console.log(newFlashcard);
  res.json(savedFlashcard);
});

flashcardsRouter.put('/:id', async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token invalid',
    });
  }

  const user = await User.findById(decodedToken.id);
  const flashcard = await Flashcard.findById(id);

  const newFlashcard = {
    front: body.front,
    back: body.back,
  };

  if (flashcard.user.toString() === user.id.toString()) {
    console.log('can update');
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      newFlashcard,
      {
        new: true,
      }
    );
    res.json(updatedFlashcard);
    console.log('updated');
    return res.status(204).end();
  } else {
    console.log('cant update');
    console.log('wrong user, expected: ', flashcard.user, 'got: ', user.id);
    return res.status(401).end();
  }
});

module.exports = flashcardsRouter;
