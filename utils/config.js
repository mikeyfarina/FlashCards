require('dotenv').config();

<<<<<<< HEAD
const PORT = 3001;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> d6bf88125bec33c50e981e5a4de7544b403c7ff1
let { MONGODB_URI } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
