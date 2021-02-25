import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import css from './UserInformation.module.css';
import UserList from '../styles/UserListItem.module.css';
import userService from '../services/userService';
import profilePhotos from '../utils/profilePhotoLoader';

const UserInformation = ({ loggedInUser }) => {
  const [desiredUser, setDesiredUser] = useState(null);
  const [displayProfilePhotoOptions, setDisplayProfilePhotoOptions] = useState(
    false
  );
  const [tempPhotoOption, setTempPhotoOption] = useState(null);

  const history = useHistory();
  const { username } = useParams();
  useEffect(() => {
    if (username) {
      userService
        .findAccountByUsername(username)
        .then((foundUser) => {
          setDesiredUser(foundUser[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [username]);

  useEffect(() => {
    if (loggedInUser && tempPhotoOption) {
      userService.changeProfilePhoto(loggedInUser.username, tempPhotoOption);
    }
  }, [tempPhotoOption]);

  return desiredUser ? (
    <div className={css.container}>
      <div className={css.info}>
        <div className={css.profile}>
          <img
            className={css.photo}
            src={
              profilePhotos[
                `${
                  tempPhotoOption && tempPhotoOption.toString()
                    ? tempPhotoOption
                    : desiredUser.photoNumber
                }`
              ]
            }
            alt="User Profile"
          />
          {loggedInUser && loggedInUser.username === desiredUser.username && (
            <div
              className={css.change}
              onClick={() => {
                setDisplayProfilePhotoOptions(!displayProfilePhotoOptions);
              }}
              role="button"
              tabIndex="0"
            >
              {displayProfilePhotoOptions ? 'Close Window' : 'Change Photo'}
            </div>
          )}
        </div>
        <div
          className={
            displayProfilePhotoOptions
              ? `${css.options} ${css.displaying}`
              : `${css.options}`
          }
          style={{
            visibility: displayProfilePhotoOptions ? 'visible' : 'hidden',
          }}
        >
          {profilePhotos.map((photo, indexOfPhoto) => (
            <div
              key={photo}
              className={
                displayProfilePhotoOptions
                  ? `${css.option} ${css.displaying}`
                  : `${css.option}`
              }
              onClick={() => {
                if (desiredUser.username === loggedInUser.username) {
                  setTempPhotoOption(indexOfPhoto.toString());
                }
              }}
              role="button"
              tabIndex="0"
            >
              <img src={photo} alt="Profile option" className={css.pic} />
            </div>
          ))}
        </div>
        <div className={css.names}>
          <h1>{desiredUser.name}</h1>
          <h3 className={css.username}>{desiredUser.username}</h3>
        </div>
        <div className={css.stats}>
          <>
            <h3 className={css.statTitle} style={{ gridArea: '1 / 1 / 2 / 2' }}>
              Sets:
            </h3>
            <h3
              className={css.statNumber}
              style={{ gridArea: '2 / 1 / 3 / 2' }}
            >
              {desiredUser.sets.length}
            </h3>
          </>
          <>
            <h3 className={css.statTitle} style={{ gridArea: '1 / 2 / 2 / 3' }}>
              Flashcards:
            </h3>
            <h3
              className={css.statNumber}
              style={{ gridArea: '2 / 2 / 3 / 3' }}
            >
              {desiredUser.flashcards.length}
            </h3>
          </>
        </div>
      </div>
      <div className={css.sets}>
        <h2 className={css.title}>Sets:</h2>
        <div className={css.display}>
          {desiredUser.sets.map((set) => (
            <div
              className={`${css.item} ${UserList.item}`}
              key={set.id}
              onClick={() => {
                history.push(`/flashcards/${set.id}`);
              }}
              role="button"
              tabIndex="0"
            >
              <div className={css.itemTitle}>
                <h3>{set.title}</h3>
              </div>
              <div className={css.size}>
                Size:
                <strong>{` ${set.flashcards.length}`}</strong>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '3vh' }} />
      </div>
      <div className={css.sets}>
        <h2 className={css.title}>Flashcards:</h2>
        <div className={css.display}>
          {desiredUser.flashcards.map((flashcard) => (
            <div
              className={`${css.item} ${UserList.item}`}
              key={flashcard.id}
              onClick={() => {
                history.push(`/flashcards/${flashcard.set.id}/${flashcard.id}`);
              }}
              role="button"
              tabIndex="0"
            >
              <div className={css.itemTitle}>
                <h3>{flashcard.front}</h3>
              </div>
              <h5 className={css.within}>
                from:
                <strong>{` ${flashcard.set.title}`}</strong>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className={css.loading}>
      <div className={css.text}>Loading User...</div>
    </div>
  );
};

export default UserInformation;
