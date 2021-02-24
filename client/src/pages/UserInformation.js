import '../styles/UserInformation.css';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import UserStyle from './UserInformation.module.css';
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
    <div className={UserStyle.container}>
      <div className={UserStyle.info}>
        <div className={UserStyle.profile}>
          <img
            className={UserStyle.photo}
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
              className={UserStyle.change}
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
              ? `${UserStyle.options} ${UserStyle.displaying}`
              : `${UserStyle.options}`
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
                  ? `${UserStyle.option} ${UserStyle.displaying}`
                  : `${UserStyle.option}`
              }
              onClick={() => {
                if (desiredUser.username === loggedInUser.username) {
                  setTempPhotoOption(indexOfPhoto.toString());
                }
              }}
              role="button"
              tabIndex="0"
            >
              <img src={photo} alt="Profile option" className={UserStyle.pic} />
            </div>
          ))}
        </div>
        <div className={UserStyle.names}>
          <h1>{desiredUser.name}</h1>
          <h3 className={UserStyle.username}>{desiredUser.username}</h3>
        </div>
        <div className={UserStyle.stats}>
          <>
            <h3
              className={UserStyle.statTitle}
              style={{ gridArea: '1 / 1 / 2 / 2' }}
            >
              Sets:
            </h3>
            <h3
              className={UserStyle.statNumber}
              style={{ gridArea: '2 / 1 / 3 / 2' }}
            >
              {desiredUser.sets.length}
            </h3>
          </>
          <>
            <h3
              className={UserStyle.statTitle}
              style={{ gridArea: '1 / 2 / 2 / 3' }}
            >
              Flashcards:
            </h3>
            <h3
              className={UserStyle.statNumber}
              style={{ gridArea: '2 / 2 / 3 / 3' }}
            >
              {desiredUser.flashcards.length}
            </h3>
          </>
        </div>
      </div>
      <div className={UserStyle.sets}>
        <h2 className={UserStyle.title}>Sets:</h2>
        <div className={UserStyle.display}>
          {desiredUser.sets.map((set) => (
            <div
              className={`${UserStyle.item} ${UserList.item}`}
              key={set.id}
              onClick={() => {
                history.push(`/flashcards/${set.id}`);
              }}
              role="button"
              tabIndex="0"
            >
              <div className={UserStyle.itemTitle}>
                <h3>{set.title}</h3>
              </div>
              <div className={UserStyle.size}>
                Size:
                <strong>{` ${set.flashcards.length}`}</strong>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: '3vh' }} />
      </div>
      <div className={UserStyle.sets}>
        <h2 className={UserStyle.title}>Flashcards:</h2>
        <div className={UserStyle.display}>
          {desiredUser.flashcards.map((flashcard) => (
            <div
              className={`${UserStyle.item} ${UserList.item}`}
              key={flashcard.id}
              onClick={() => {
                history.push(`/flashcards/${flashcard.set.id}/${flashcard.id}`);
              }}
              role="button"
              tabIndex="0"
            >
              <div className={UserStyle.itemTitle}>
                <h3>{flashcard.front}</h3>
              </div>
              <h5 className={UserStyle.within}>
                from:
                <strong>{` ${flashcard.set.title}`}</strong>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className={UserStyle.loading}>
      <div className={UserStyle.text}>Loading User...</div>
    </div>
  );
};

export default UserInformation;
