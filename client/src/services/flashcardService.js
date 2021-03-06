import axios from 'axios';

const baseUrl = '/api/flashcards';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllFlashcards = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const createFlashcard = async (newFlashcard) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newFlashcard, config);
  return response.data;
};

const updateFlashcard = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.put(`${baseUrl}/${id}`, newObject, config);
  return req.then((res) => res.data);
};

const deleteFlashcard = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.delete(`${baseUrl}/${id}`, config);
  return req.then((res) => res.data);
};

export default {
  getAllFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  setToken,
};
