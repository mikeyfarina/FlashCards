const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Set = require('../models/set');
const Flashcard = require('../models/flashcard');
const User = require('../models/user');

const baseUrl = '/api/sets';

let token;

beforeEach(async () => {
  await Set.deleteMany({});
  await Flashcard.deleteMany({});
  await User.deleteMany({});

  const user = {
    name: 'root',
    username: 'root',
    password: 'password',
  };
  const newUser = new User(user);
  const savedUser = await newUser.save();

  const newFlashcard = {
    front: 'test front',
    back: 'test',
    date: new Date(),
    user: savedUser._id,
  };

  const newCard = new Flashcard(newFlashcard);
  const savedCard = await newCard.save();

  const setObjs = helper.initialSets.map((set, i) => {
    if (i === 0) set.flashcards = savedCard._id;
    set.user = savedUser._id;
    return new Set(set);
  });

  const promiseArray = setObjs.map((set) => set.save());
  await Promise.all(promiseArray);
});

describe('when there are initially some sets saved', () => {
  test('sets are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all sets are returned', async () => {
    const res = await api.get(baseUrl);
    expect(res.body).toHaveLength(helper.initialSets.length);
  });

  test('a specific set is within the returned sets', async () => {
    const res = await api.get(baseUrl);
    const setTitles = res.body.map((set) => set.title);

    expect(setTitles).toContain('initial set from backend');
  });

  test('first set has one flashcard, while the second set does not', async () => {
    const res = await api.get(baseUrl);
    const firstSet = res.body.filter(
      (set) => set.title === 'initial set from backend'
    )[0];

    const secondSet = res.body.filter(
      (set) => set.title === 'second set from initSets'
    )[0];
    console.log(firstSet, secondSet);
    expect(firstSet.flashcards).toHaveLength(1);
    expect(secondSet.flashcards).toHaveLength(0);
  });
});

describe('viewing a specific set', () => {
  test('succeeds with a valid id', async () => {
    const sets = await helper.setsInDb();
    const setToView = sets[0];

    const resultSet = await api
      .get(`${baseUrl}/${setToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const processedSet = JSON.parse(JSON.stringify(setToView));

    expect(resultSet.body).toEqual(processedSet);
  });

  test('fails with 404 if id does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId();
    console.log(validNonExistingId);
    await api.get(`${baseUrl}/${validNonExistingId}`).expect(404);
  });

  test('fails with status code 400 id is invalid', async () => {
    const invalidID = 'this id is invalid';
    await api.get(`${baseUrl}/${invalidID}`).expect(400);
  });
});

/*
describe.only('after logging in...', () => {
  beforeEach((done) => {
    api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'password',
      })
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        token = res.body.token;
      });
    console.log(token);
    done();
  });
  describe('creation of a set', () => {
    test('succeeds', async () => {
      const newSet = {
        title: 'test set',
      };

      await api
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(newSet)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const setsAtEnd = await helper.setsInDb();
      expect(setsAtEnd).toHaveLength(helper.initialSets.length + 1);

      const setTitles = setsAtEnd.map((set) => set.title);
      expect(setTitles).toContain(newSet.title);
    });
  });

  describe('deletion of a set', () => {
    test('succeeds with a 204', async () => {
      const setsAtStart = await helper.setsInDb();
      const setToDelete = setsAtStart[1];

      await api
        .delete(`${baseUrl}/${setToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const setsAtEnd = await helper.setsInDb();
      expect(setsAtEnd).toHaveLength(helper.initialSets.length - 1);

      const titles = cardsAtEnd.map((set) => set.title);
      expect(titles).not.toContain(setToDelete.title);
    });
  });
});

*/

afterAll(() => mongoose.disconnect());
