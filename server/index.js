require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('build'));
const Flashcard = require('./models/flashcard');
const cors = require('cors');
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/', (req, res) => {});

app.get('/api/flashcards', (req, res) => {
  Flashcard.find({}).then((flashcards) => {
    res.json(flashcards);
  });
});

app.get('/api/flashcards/:id', (req, res) => {
  Flashcard.findById(req.params.id)
    .then((flashcard) => {
      if (flashcard) {
        res.json(flashcard);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/flashcards/:id', (req, res) => {
  const id = req.params.id;
  Flashcard.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/flashcards', (req, res) => {
  const body = req.body;
  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }
  const newFlashcard = new Flashcard({
    front: body.front,
    back: body.back,
  });
  newFlashcard.save().then((savedFlashcard) => {
    res.json(savedFlashcard);
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }

  const newFlashcard = {
    front: body.front,
    back: body.back,
  };

  console.log('newF', newFlashcard);

  Flashcard.findByIdAndUpdate(id, newFlashcard, { new: true })
    .then((updatedFlashcard) => {
      res.json(updatedFlashcard);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
