import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/flashcards';

const getAllFlashcards = () => {
  return axios.get(baseUrl);
};

const createFlashcard = (newFlashcard) => {
  return axios.post(baseUrl, newFlashcard);
};

const updateFlashcard = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAllFlashcards: getAllFlashcards,
  createFlashcard: createFlashcard,
  updateFlashcard: updateFlashcard,
};
