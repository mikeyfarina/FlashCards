const router = require('express').Router();
const Flashcard = require('../models/flashcard');
const Set = require('../models/set');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  await Flashcard.deleteMany({});
  await User.deleteMany({});

  console.log('reset complete');
  response.status(204).end();
});

module.exports = router;
