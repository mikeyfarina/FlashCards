const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const Flashcard = require('../models/flashcard');
const Set = require('../models/set');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('flashcards', {
      front: 1,
      back: 1,
    })
    .populate('sets', {
      title: 1,
      date: 1,
    });
  res.json(users);
});

usersRouter.get('/:username', async (req, res) => {
  const user = await User.find({
    username: { $in: req.params.username },
  })
    .populate({
      path: 'flashcards',
      populate: {
        path: 'set',
        select: 'title',
      },
    })
    .populate({
      path: 'sets',
      populate: {
        path: 'flashcards',
        select: 'id',
      },
    })
    .exec();
  console.log(user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(204).json({
      error: 'user does not exist',
    });
  }
});

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const randomProfilePhotoIndex = Math.floor(Math.random() * Math.floor(6));

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    photoNumber: randomProfilePhotoIndex,
  });

  const savedUser = await user.save().catch((err) => res.json(err));
  res.json(savedUser);
});

usersRouter.patch('/:id/profile', async (req, res) => {
  const randomProfilePhotoIndex = Math.floor(Math.random() * Math.floor(6));

  const photoNumber = req.body.photoNumber || randomProfilePhotoIndex;
  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { photoNumber: photoNumber }
  );

  res.json(user);
});

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204);
});

module.exports = usersRouter;
