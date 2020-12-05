import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/flashcards';

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

const deleteFlashcard = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

export default {
  getAllFlashcards: getAllFlashcards,
  createFlashcard: createFlashcard,
  updateFlashcard: updateFlashcard,
  deleteFlashcard: deleteFlashcard,
};
