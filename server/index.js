const express = require('express');
const app = express();
app.use(express.json());

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

let flashcards = [
  { id: 'a', front: 'first flashcard', back: 'back of first flashcard' },
  {
    id: 'b',
    front: 'second flashcard',
    back: 'back of second flashcard',
  },
  { id: 'c', front: 'third flashcard', back: 'back of third flashcard' },
  {
    id: 'd',
    front: 'fourth flashcard',
    back: 'back of fourth flashcard',
  },
  { id: 'e', front: 'fifth flashcard', back: 'back of fifth flashcard' },
];

app.get('/', (req, res) => {
  res.send('db');
});

app.get('/api/flashcards', (req, res) => {
  res.json(flashcards);
});

app.get('/api/flashcards/:id', (req, res) => {
  const id = req.params.id;
  const flashcard = flashcards.find((flashcard) => flashcard.id === id);
  if (flashcard) {
    res.json(flashcard);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/flashcards/:id', (req, res) => {
  const id = req.params.id;
  flashcards = flashcards.filter((card) => card.id !== id);

  res.status(204).end();
});

app.post('/api/flashcards', (req, res) => {
  const flashcard = req.body;
  flashcards = flashcards.concat(flashcard);
  res.json(flashcard);
});

app.put('/api/flashcards/:id', (req, res) => {
  const id = req.params.id;
  const newFlashcard = req.body;
  console.log('newF', newFlashcard);
  flashcards = flashcards.map((card) => (card.id === id ? newFlashcard : card));
  res.status(200).send(newFlashcard);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
