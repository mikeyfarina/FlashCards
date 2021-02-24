import axios from 'axios';

const baseUrl = '/api/users';

const createAccount = async (accountInfo) => {
  const response = await axios.post(baseUrl, accountInfo);
  return response.data;
};

const findAccountByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`);
  return response.data;
};

const changeProfilePhoto = async (username, photoIndex) => {
  const response = await axios.patch(`${baseUrl}/${username}/profile`, {
    photoIndex,
  });
  return response.data;
};

export default { createAccount, findAccountByUsername, changeProfilePhoto };
