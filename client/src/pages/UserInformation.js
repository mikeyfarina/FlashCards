import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useParams } from 'react-router-dom';
import profilePhotos from '../utils/profilePhotoLoader';
const UserInformation = () => {
  const [user, setUser] = useState(null);
  const username = useParams().username;
  console.log(username);
  useEffect(() => {
    if (username) {
      console.log(username);
      userService
        .findAccountByUsername(username)
        .then((foundUser) => {
          console.log(foundUser);
          setUser(foundUser[0]);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  console.log(user);

  const userInfoStyle = {
    height: '90vh',
    width: '90vw',
    padding: '1% 5% 0 5%',
    background: 'white',
    margin: 'auto',
    borderRadius: '5px',
    boxShadow: '0 15px 25px rgba(1,1,1,0.3), 0 0px 5px rgba(1,1,1,0.4)',
    zIndex: 1,
  };
  const basicInfoContainer = {
    padding: '5vh 5vw',
    display: 'grid',
    gridTemplateColumns: 'auto .5fr 2fr',
    borderRadius: '8px',
    boxShadow: '0 15px 25px rgba(1,1,1,0.1)',
    height: '30vh',
    background:
      'linear-gradient(221deg, rgba(93,162,213,1) 0%, rgba(133,196,247,1) 39%, rgba(255,255,255,1) 100%)',
    alignItems: 'center',
  };

  const profilePhotoStyle = {
    height: '20vh',
    borderRadius: '4px',
  };

  const basicStatsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 2fr',
    width: '50%',
    height: '50%',
    marginLeft: 'auto',
    borderRadius: '8px',
    textAlign: 'center',
    background:
      'radial-gradient(circle, rgba(236,236,236,1) 0%, rgba(236,236,236,1) 48%, rgba(255,255,255,1) 100%)',
    alignSelf: 'center',
  };

  const statNumberStyle = {
    fontSize: '4vh',
    alignSelf: 'center',
  };

  const statTitleStyle = {
    alignSelf: 'center',
  };

  const setDisplayContainerStyle = {
    display: 'grid',
    gridTemplateRows: '1fr 3fr',
    alignItems: 'center',
    height: '55vh',
  };
  const setDisplayStyle = {
    border: '1px rgba(1,1,1,.2) solid',
    borderRadius: '8px',
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',

    height: '45vh',
  };

  const setStyle = {
    border: '1px rgba(1,1,1,.2) solid',
    borderRadius: '8px',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    height: '12vh',
    margin: '2%',
    width: '25vw',
    alignItems: 'center',
    padding: '1% 2%',
  };

  console.log(user);
  return user ? (
    <div className={'user-info'} style={userInfoStyle}>
      <div className={'user-info__basic'} style={basicInfoContainer}>
        <div className={'user-info__basic__photo'}>
          <img src={profilePhotos[0]} style={profilePhotoStyle} />
        </div>
        <div
          className={'user-info__basic__names'}
          style={{ marginLeft: '4vw' }}
        >
          <h1>{user.name}</h1>
          <h3 style={{ fontStyle: 'italic', marginTop: 'revert' }}>
            {user.username}
          </h3>
        </div>
        <div className={'user-info__basic__stats'} style={basicStatsStyle}>
          <div className={'stats__sets'} style={{ display: 'contents' }}>
            <h3 style={{ ...statTitleStyle, gridArea: '1 / 1 / 2 / 2' }}>
              Sets:
            </h3>
            <h3 style={{ ...statNumberStyle, gridArea: '2 / 1 / 3 / 2' }}>
              {user.sets.length}
            </h3>
          </div>
          <div className={'stats__flashcards'} style={{ display: 'contents' }}>
            <h3 style={{ ...statTitleStyle, gridArea: '1 / 2 / 2 / 3' }}>
              Flashcards:
            </h3>
            <h3 style={{ ...statNumberStyle, gridArea: '2 / 2 / 3 / 3' }}>
              {user.flashcards.length}
            </h3>
          </div>
        </div>
      </div>
      <div style={setDisplayContainerStyle}>
        <h2>Created Flashcard Sets:</h2>
        <div className={'setDisplay'} style={setDisplayStyle}>
          {user.sets.map((set) => {
            return (
              <div className={'setItem'} style={setStyle} key={set.id}>
                <h3>{set.title}</h3>
                <h5>Flashcards: {set.flashcards.length}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <h3>Loading User...</h3>
  );
};

export default UserInformation;
