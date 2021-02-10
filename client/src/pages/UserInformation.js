import '../styles/PagesStyles.css';
import '../styles/UserInformation.css';

import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import { useParams, useHistory } from 'react-router-dom';
import profilePhotos from '../utils/profilePhotoLoader';

const UserInformation = ({ loggedInUser }) => {
  const [desiredUser, setDesiredUser] = useState(null);
  const [displayProfilePhotoOptions, setDisplayProfilePhotoOptions] = useState(
    false
  );
  const [tempPhotoOption, setTempPhotoOption] = useState(null);

  const history = useHistory();
  const username = useParams().username;
  useEffect(() => {
    if (username) {
      console.log(username);
      userService
        .findAccountByUsername(username)
        .then((foundUser) => {
          console.log(foundUser);
          setDesiredUser(foundUser[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [username]);

  useEffect(() => {
    if (loggedInUser) {
      console.log(tempPhotoOption);
      userService
        .changeProfilePhoto(loggedInUser.username, tempPhotoOption)
        .then((u) => {
          console.log(u, 'set pp');
        });
    }
  }, [tempPhotoOption]);
  console.log(loggedInUser, desiredUser);

  const userInfoStyle = {
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
    borderRadius: '8px',
    boxShadow: '0 15px 25px rgba(1,1,1,0.1)',
    margin: '6vh 0 9vh 0',
    background:
      'linear-gradient(221deg, rgba(93,162,213,1) 0%, rgba(133,196,247,1) 39%, rgba(255,255,255,1) 100%)',
    alignItems: 'center',
    scrollSnapAlign: 'start',

    position: 'relative',
  };

  const basicStatsStyle = {
    display: 'grid',
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
    padding: '1%',
    overflowY: 'scroll',
    display: 'inline-block',
    scrollSnapAlign: 'end',
    scrollSnapType: 'y',
  };

  const setDisplayStyle = {};

  const setStyle = {
    background: 'white',
    border: '1px rgba(1,1,1,.2) solid',
    borderRadius: '8px',
    height: '14vh',
    alignSelf: 'center',
    textAlign: 'center',
    boxShadow: '0px 0px 20px rgb(1 1 1 / 10%), 0 0 5px rgb(1 1 1 / 30%)',
    transition: 'all .15s ease-in-out',
    position: 'relative',
    float: 'left',
    scrollSnapAlign: 'start',
    scrollMarginTop: '1.5vh',
    scrollMarginBottom: '1vh',
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
    float: 'left',
    padding: '1% 2%',
    scrollSnapAlign: 'start',
    scrollMarginTop: '1.5vh',
    scrollMarginBottom: '1vh',
    display: 'flex',
  };

  const setTitleContainerStyle = {
    overflow: 'scroll',
    maxHeight: '80%',
    width: '100%',
    display: 'flex',
    textOverflow: 'ellipsis',
    justifyContent: 'center',
  };

  return desiredUser ? (
    <div className={'user-info'} style={userInfoStyle}>
      <div className={'user-info__basic'} style={basicInfoContainer}>
        <div
          className={'user-info__basic__photo'}
          style={{
            position: 'relative',

            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0px 0px 45px rgba(1,1,1,.35)',
            transition: 'all .5s ease-in-out',
          }}
        >
          <img
            style={{
              height: '100%',
              width: '100%',
            }}
            src={
              profilePhotos[
                `${
                  tempPhotoOption && tempPhotoOption.toString()
                    ? tempPhotoOption
                    : desiredUser.photoNumber
                }`
              ]
            }
          />
          {loggedInUser && loggedInUser.username === desiredUser.username && (
            <div
              className={'change-profile-button'}
              style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                color: 'white',
                transition: 'all .25s ease-in',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setDisplayProfilePhotoOptions(!displayProfilePhotoOptions);
              }}
            >
              {displayProfilePhotoOptions ? 'Close Window' : 'Change Photo'}
            </div>
          )}
        </div>

        <div
          className={
            displayProfilePhotoOptions
              ? 'displaying photo-options-container'
              : 'photo-options-container'
          }
          style={{
            width: 'fit-content',
            height: 'fit-content',
            zIndex: '3',
            position: 'absolute',
            background: 'aliceblue',
            visibility: displayProfilePhotoOptions ? 'visible' : 'hidden',
            display: 'grid',
            gridGap: '1vh',
            gridTemplateColumns: 'repeat(3, 10vh)',
            gridTemplateRows: 'repeat(2, 10vh)',
            padding: '1vh',
            border: '#646c80 2px solid',
            borderRadius: '5px',
            transition: 'all .5s ease-in',
          }}
        >
          {profilePhotos.map((photo, indexOfPhoto) => (
            <img
              key={photo}
              src={photo}
              className={
                displayProfilePhotoOptions
                  ? 'displaying profile-photo-option'
                  : 'profile-photo-option'
              }
              style={{
                height: '100%',
                width: '100%',
                border: '#ececec 2px solid',
                borderRadius: '5px',
                boxSizing: 'border-box',
                transition: 'all .1s ease-in',
              }}
              onClick={() => {
                if (desiredUser.username === loggedInUser.username) {
                  console.log(indexOfPhoto);
                  setTempPhotoOption(indexOfPhoto);
                }
              }}
            />
          ))}
        </div>
        <div
          className={'user-info__basic__names'}
          style={{ marginLeft: '4vw' }}
        >
          <h1>{desiredUser.name}</h1>
          <h3 style={{ fontStyle: 'italic', marginTop: 'revert' }}>
            {desiredUser.username}
          </h3>
        </div>
        <div className={'user-info__basic__stats'} style={basicStatsStyle}>
          <div className={'stats__sets'} style={{ display: 'contents' }}>
            <h3 style={{ ...statTitleStyle, gridArea: '1 / 1 / 2 / 2' }}>
              Sets:
            </h3>
            <h3 style={{ ...statNumberStyle, gridArea: '2 / 1 / 3 / 2' }}>
              {desiredUser.sets.length}
            </h3>
          </div>
          <div className={'stats__flashcards'} style={{ display: 'contents' }}>
            <h3 style={{ ...statTitleStyle, gridArea: '1 / 2 / 2 / 3' }}>
              Flashcards:
            </h3>
            <h3 style={{ ...statNumberStyle, gridArea: '2 / 2 / 3 / 3' }}>
              {desiredUser.flashcards.length}
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
          {desiredUser.sets.map((set) => {
            return (
              <div
                className={'set-item user-list-item'}
                style={setStyle}
                key={set.id}
                onClick={() => {
                  history.push(`/flashcards/${set.id}`);
                }}
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
          {desiredUser.flashcards.map((flashcard) => {
            console.log(flashcard);
            return (
              <div
                className={'flashcard-item user-list-item'}
                style={flashcardStyle}
                key={flashcard.id}
                onClick={() => {
                  history.push(
                    `/flashcards/${flashcard.set.id}/${flashcard.id}`
                  );
                }}
              >
                <div style={setTitleContainerStyle}>
                  <h3>{flashcard.front}</h3>
                </div>
                <h5
                  style={{
                    position: 'absolute',
                    bottom: '4%',
                    right: '4%',
                    color: 'darkgray',
                    fontWeight: 'lighter',
                    maxWidth: '75%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
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
