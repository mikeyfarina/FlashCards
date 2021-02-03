const setsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Flashcard = require('../models/flashcard');
const Set = require('../models/set');
const User = require('../models/user');

setsRouter.get('/', async (req, res) => {
  const sets = await Set.find({})
    .populate('flashcards', {
      front: 1,
      back: 1,
    })
    .populate('users', {
      name: 1,
      username: 1,
    });
  res.json(sets);
});

setsRouter.get('/:id', async (req, res) => {
  const set = await Set.findById(req.params.id);
  if (set) {
    res.json(set);
  } else {
    res.status(404).end();
  }
});

setsRouter.get('/:id/flashcards', async (req, res) => {
  const set = await Set.findById(req.params.id);
  const flashcards = await Flashcard.find({
    _id: { $in: set.flashcards },
  }).select('front back');
  if (flashcards) {
    console.log(flashcards);
    res.json(flashcards);
  } else {
    res.status(404).end();
  }
});

setsRouter.post('/', async (req, res) => {
  const body = req.body;
  console.log(body, req.token);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'token invalid',
    });
  }

  const user = await User.findById(decodedToken.id);

  const newSet = new Set({
    title: body.title,
    user: user._id,
    username: user.username,
    date: new Date(),
    flashcards: [],
  });
  const savedSet = await newSet.save();

  user.sets = user.sets.concat(savedSet._id);
  await user.save();

  console.log(savedSet);
  res.json(savedSet);
});

setsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(404).json({
      error: 'invalid token',
    });
  }

  const user = await User.findById(decodedToken.id);
  await user.update({ $pull: { sets: req.params.id } });
  await user.save();

  const set = await Set.findById(req.params.id);

  const IDsOfFlashcardsInSet = set.flashcards;
  IDsOfFlashcardsInSet.map(async (id) => {
    await user.update({ $pull: { flashcards: id } });
    console.log(`removed: ${id} from users flashcards`);
  });

  if (set.user.toString() === user.id.toString()) {
    console.log('deleting...', set);
    const deletedSet = await Set.findByIdAndDelete(req.params.id);
    console.log('gone');
    return res.status(204).json(deletedSet);
  } else {
    console.log('wrong user, expected: ', set.user, 'but received: ', user.id);
    return res.status(401).json({
      error: 'only the user who made the set can delete',
    });
  }
});

setsRouter.patch('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(404).json({
      error: 'invalid token',
    });
  }

  const user = await User.findById(decodedToken.id);
  const set = await Set.findById(req.params.id);

  if (set.user.toString() === user.id.toString()) {
    const updatedSet = await Set.findByIdAndUpdate(set.id, {
      title: req.body.title,
    });

    res.json(updatedSet);
  } else {
    return res.status(401).json({
      error: 'only the user who made the set can edit',
    });
  }
});

module.exports = setsRouter;
