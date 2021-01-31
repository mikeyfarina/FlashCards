import React from 'react';
import userService from '../services/userService';
import { useRouteMatch } from 'react-router-dom';

const UserInformation = ({ user }) => {
  const usernameMatch = useRouteMatch();
  console.log(usernameMatch);
  const desiredUserForInfo = usernameMatch
    ? userService.findAccountByUsername(usernameMatch.params.username)
    : null;
  console.log(desiredUserForInfo, usernameMatch);

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <h4 style={{ fontStyle: 'italic' }}>{user.username}</h4>
    </div>
  ) : (
    <h3>Loading User...</h3>
  );
};

export default UserInformation;
