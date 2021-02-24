const testingRouter = require('express').Router();
const Flashcard = require('../models/flashcard');
const Set = require('../models/set');
const User = require('../models/user');

testingRouter.post('/reset', async (request, response) => {
  await Flashcard.deleteMany();
  await User.deleteMany();
  await Set.deleteMany();

  console.log('reset complete');
  response.status(204).end();
});

module.exports = testingRouter;
