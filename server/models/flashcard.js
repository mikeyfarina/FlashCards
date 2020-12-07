const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  front: String,
  back: String,
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

flashcardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;
