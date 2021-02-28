const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const Flashcard = require('../models/flashcard');
const User = require('../models/user');

const api = supertest(app);

const baseUrl = '/api/flashcards';

beforeAll(async () => {
  await User.deleteMany({});

  const savedUser = await helper.createAccount({
    username: 'test',
    password: 'test',
    name: 'test',
  });

  const login = await api.post('/api/login').send({
    username: savedUser.username,
    name: savedUser.name,
    password: 'test',
  });
  console.log(login);
});

beforeEach(async () => {
  await Flashcard.deleteMany({});
  const flashcardObjects = helper.initialFlashcards.map(
    (flashcard) => new Flashcard(flashcard)
  );
  const promiseArray = flashcardObjects.map((flashcard) => flashcard.save());
  await Promise.all(promiseArray);
});

describe('when there are initially some flashcards saved', () => {
  test('flashcards are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all flashcards are returned', async () => {
    const response = await api.get('/api/flashcards');
    expect(response.body).toHaveLength(helper.initialFlashcards.length);
  });
  test('a specific flashcard is within the returned flashcards', async () => {
    const response = await api.get('/api/flashcards');

    const frontOfCards = response.body.map((card) => card.front);

    expect(frontOfCards).toContain('first flashcard');
  });
});

describe('viewing a specific flashcard', () => {
  test('succeeds with a valid id', async () => {
    const cardsAtStart = await helper.flashcardsInDb();
    const cardToView = cardsAtStart[0];

    const resultCard = await api
      .get(`${baseUrl}/${cardToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const processedCardToView = JSON.parse(JSON.stringify(cardToView));

    expect(resultCard.body).toEqual(processedCardToView);
  });
  test('fails with statuscode 404 if flashcard does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();
    console.log(validNonExistingId);
    await api.get(`${baseUrl}/${validNonExistingId}`).expect(404);
  });
  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api.get(`${baseUrl}/${invalidId}`).expect(400);
  });
});

describe.only('creating flashcard', () => {
  test('succeeds', async () => {
    const newCard = {
      front: 'front of new card',
      back: 'back of new card',
      user: savedUser._id,
    };

    await api
      .post(baseUrl)
      .send(newCard)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const cardsAtEnd = await helper.flashcardsInDb();
    expect(cardsAtEnd).toHaveLength(helper.initialFlashcards.length + 1);

    const fronts = cardsAtEnd.map((card) => card.front);
    expect(fronts).toContain(newCard.front);
  });
});

describe('deletion of a flashcard', () => {
  test('successful deletion responds with 204', async () => {
    const cardsAtStart = await helper.flashcardsInDb();
    const cardToDelete = cardsAtStart[0];

    await api.delete(`${baseUrl}/${cardToDelete.id}`).expect(204);

    const cardsAtEnd = await helper.flashcardsInDb();
    expect(cardsAtEnd).toHaveLength(helper.initialFlashcards.length - 1);

    const fronts = cardsAtEnd.map((card) => card.front);
    expect(fronts).not.toContain(cardToDelete.front);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
