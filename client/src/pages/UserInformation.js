import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useParams } from 'react-router-dom';
import profilePhotos from '../utils/profilePhotoLoader';

const UserInformation = ({ loggedInUser, loggedInUserId }) => {
  const [user, setUser] = useState(null);
  const [displayProfilePhotoOptions, setDisplayProfilePhotoOptions] = useState(
    false
  );

  const username = useParams().username;
  console.log(loggedInUserId);
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

  useEffect(() => {
    if (user && !user.photoNumber) {
      userService.changeProfilePhoto(user.id);
    }
  }, [user]);
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
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
  };
  const basicInfoContainer = {
    padding: '5vh 5vw',
    display: 'grid',
    gridTemplateColumns: '20vh .5fr 2fr',
    borderRadius: '8px',
    boxShadow: '0 15px 25px rgba(1,1,1,0.1)',
    height: '30vh',
    margin: '6vh 0 9vh 0',
    background:
      'linear-gradient(221deg, rgba(93,162,213,1) 0%, rgba(133,196,247,1) 39%, rgba(255,255,255,1) 100%)',
    alignItems: 'center',
    scrollSnapAlign: 'start',
    scrollMarginTop: '6vh',
    position: 'relative',
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
      'radial-gradient(circle, rgba(235,235,235,1) 0%, rgba(255,255,255,1) 100%)',
    alignSelf: 'center',
    boxShadow: '0px 0px 45px rgba(1,1,1,.35)',
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
    height: '40vh',
    margin: '3vh 0 5.5vh 0',
  };

  const displayStyle = {
    border: '1px rgba(1,1,1,.2) solid',
    borderRadius: '8px',
    height: '36vh',
    background:
      'linear-gradient(221deg, rgba(255,255,255,1) 0%, rgba(235,234,234,1) 47%, rgba(255,255,255,1) 100%)',
    marginBottom: '3vh',
    overflowY: 'scroll',
    display: 'inline-block',
    scrollSnapAlign: 'end',
    scrollSnapType: 'y mandatory',
  };

  const setDisplayStyle = {};

  const setStyle = {
    background: 'white',
    border: '1px rgba(1,1,1,.2) solid',
    borderRadius: '8px',
    height: '14vh',
    margin: '2vh 2vw',
    width: '22vw',
    alignSelf: 'center',
    textAlign: 'center',
    padding: '1% 2%',
    boxShadow: '0px 0px 20px rgb(1 1 1 / 10%), 0 0 5px rgb(1 1 1 / 30%)',
    transition: 'all .15s ease-in-out',
    position: 'relative',
    float: 'left',
    scrollSnapAlign: 'end',
    scrollMarginBottom: '2vh',
  };

  const flashcardsDisplayStyle = {
    scrollMarginBottom: '4vh',
  };

  const flashcardStyle = {
    background: 'white',
    border: '1px rgba(1,1,1,.2) solid',
    borderRadius: '8px',
    transition: 'all .1s ease-in',
    position: 'relative',
    boxShadow: '0px 0px 20px rgb(1 1 1 / 10%), 0 0 5px rgb(1 1 1 / 30%)',
    height: '14vh',
    width: '23%',
    margin: '2vh 1%',
    float: 'left',
    padding: '1% 2%',
    scrollSnapAlign: 'end',
    scrollMarginBottom: '1vh',
    display: 'flex',
  };

  const setTitleContainerStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  console.log(user);
  return user ? (
    <div className={'user-info'} style={userInfoStyle}>
      <div className={'user-info__basic'} style={basicInfoContainer}>
        <div
          className={'user-info__basic__photo'}
          style={{
            position: 'relative',
            height: '20vh',
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0px 0px 45px rgba(1,1,1,.35)',
            transition: 'all .5s ease-in-out',
          }}
        >
          <img
            style={{ height: '100%', width: '100%' }}
            src={profilePhotos[user.photoNumber]}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              height: '3vh',
              width: '100%',
              background:
                'linear-gradient(0deg, rgba(1,1,1,.5) 0%, rgba(1,1,1,.0) 85%)',
              color: 'white',
              transition: 'all .25s ease-in',
              textAlign: 'center',
              alignSelf: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              setDisplayProfilePhotoOptions(!displayProfilePhotoOptions);
            }}
          >
            Change Photo
          </div>
        </div>
        {displayProfilePhotoOptions && (
          <div
            className={'photo-options-container'}
            style={{
              width: '34vh',
              height: '23vh',
              zIndex: '3',
              position: 'absolute',
              left: '28vh',
              background: 'aliceblue',
              display: 'grid',
              gridGap: '1vh',
              gridTemplateColumns: 'repeat(3, 10vh)',
              gridTemplateRows: 'repeat(2, 10vh)',
              padding: '1vh',
              border: '#646c80 2px solid',
              borderRadius: '5px',
            }}
          >
            {profilePhotos.map((photo, indexOfPhoto) => (
              <img
                key={Math.random() * 100}
                src={photo}
                className={'profile-photo-option'}
                style={{
                  height: '100%',
                  width: '100%',
                  border: '#ececec 2px solid',
                  borderRadius: '5px',
                  boxSizing: 'border-box',
                  transition: 'all .1s ease-in',
                }}
                onClick={() => {
                  if (user.username === loggedInUser.username) {
                    userService.changeProfilePhoto(
                      loggedInUserId,
                      indexOfPhoto
                    );
                  }
                }}
              />
            ))}
          </div>
        )}
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
        <h2 style={{ marginBottom: '1vh' }}>Sets:</h2>
        <div
          className={'setDisplay'}
          style={{ ...displayStyle, ...setDisplayStyle }}
        >
          {user.sets.map((set) => {
            return (
              <div
                className={'setItem user-list-item'}
                style={setStyle}
                key={set.id}
              >
                <div style={setTitleContainerStyle}>
                  <h3>{set.title}</h3>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '4%',
                    right: '4%',
                    color: 'darkgray',
                    fontWeight: 'lighter',
                  }}
                >
                  Size: <strong>{set.flashcards.length}</strong>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height: '3vh' }}></div>
      </div>
      <div style={{ ...setDisplayContainerStyle, marginBottom: '3vh' }}>
        <h2 style={{ marginBottom: '1vh' }}>Flashcards:</h2>
        <div
          className={'setDisplay'}
          style={{ ...flashcardsDisplayStyle, ...displayStyle }}
        >
          {user.flashcards.map((flashcard) => {
            console.log(flashcard);
            return (
              <div
                className={'flashcardItem user-list-item'}
                style={flashcardStyle}
                key={flashcard.id}
              >
                <h3>{flashcard.front}</h3>
                <h5
                  style={{
                    position: 'absolute',
                    bottom: '4%',
                    right: '4%',
                    color: 'darkgray',
                    fontWeight: 'lighter',
                  }}
                >
                  from: <strong>{flashcard.set.title}</strong>
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        height: '90vh',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          alignSelf: 'center',
          fontSize: '5vw',
          marginBottom: '25vh',
          background: 'transparent',
        }}
      >
        Loading User...
      </div>
    </div>
  );
};

export default UserInformation;
