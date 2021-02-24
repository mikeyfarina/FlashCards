import axios from 'axios';

const baseUrl = '/api/sets';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllSets = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getSetById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const getAllFlashcardsInSet = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/flashcards`);
  return res.data;
};

const createSet = async (newSet) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newSet, config);
  return res.data;
};

const updateSetTitle = (id, newTitle) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.patch(`${baseUrl}/${id}`, { title: newTitle }, config);
  return req.then((res) => res.data);
};

const deleteSet = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export default {
  setToken,
  getAllSets,
  getSetById,
  getAllFlashcardsInSet,
  createSet,
  updateSetTitle,
  deleteSet,
};
