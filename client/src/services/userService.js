const baseUrl = '/api/users';
import axios from 'axios';

const createAccount = async (accountInfo) => {
  const response = await axios.post(baseUrl, accountInfo);
  return response.data;
};

const findAccountByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const changeProfilePhoto = async (id, photoIndex) => {
  const response = await axios.patch(`${baseUrl}/${id}/profile`, {
    photoIndex,
  });
  return response.data;
};

export default { createAccount, findAccountByUsername, changeProfilePhoto };
