const router = require('express').Router();
const Flashcard = require('../models/flashcard');
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/reset', async (request, response) => {
  await Flashcard.deleteMany({});
  await User.deleteMany({});

  const flashcard = new Flashcard({
    front: 'front of card',
    back: 'back of card',
  });
  try {
    const savedFlashcard = await flashcard.save();
  } catch (err) {
    console.error(err);
  }
  console.log('reset complete');
  response.status(204).end();
});

module.exports = router;
