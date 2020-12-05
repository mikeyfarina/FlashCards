import axios from 'axios';
const baseUrl = '/api/flashcards';

const getAllFlashcards = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const createFlashcard = (newFlashcard) => {
  const req = axios.post(baseUrl, newFlashcard);
  return req.then((res) => res.data);
};

const updateFlashcard = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

export default {
  getAllFlashcards: getAllFlashcards,
  createFlashcard: createFlashcard,
  updateFlashcard: updateFlashcard,
};
