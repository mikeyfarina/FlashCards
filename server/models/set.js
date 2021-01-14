const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  title: String,
  flashcards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flashcard',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: mongoose.Schema.Types.String,
    ref: 'Username',
  },
});

setSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
