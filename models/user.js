const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
  passwordHash: String,
  flashcards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flashcard',
    },
  ],
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Set',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
