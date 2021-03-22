import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import css from './UserInformation.module.css';
import ProfilePhotoOption from '../components/ProfilePhotoOption';
import UserFlashcardItem from '../components/UserFlashcardItem';
import UserSetItem from '../components/UserSetItem';
import userService from '../services/userService';
import profilePhotos from '../utils/profilePhotoLoader';

const UserInformation = ({ loggedInUser }) => {
  const [desiredUser, setDesiredUser] = useState(null);
  const [displayProfilePhotoOptions, setDisplayProfilePhotoOptions] = useState(
    false
  );
  const [tempPhotoOption, setTempPhotoOption] = useState(null);
  const [onOwnPage, setOnOwnPage] = useState(false);

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
    if (desiredUser && loggedInUser) {
      setOnOwnPage(desiredUser.username === loggedInUser.username);
    }
  }, [desiredUser, loggedInUser]);

  useEffect(() => {
    if (loggedInUser && tempPhotoOption) {
      userService.changeProfilePhoto(loggedInUser.username, tempPhotoOption);
    }
  }, [tempPhotoOption]);

  const handleClick = useCallback(() => {
    setDisplayProfilePhotoOptions(!displayProfilePhotoOptions);
  }, [displayProfilePhotoOptions]);

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
          {loggedInUser?.username === desiredUser?.username && (
            <div
              className={css.change}
              onClick={handleClick}
              role="button"
              tabIndex="0"
            >
              {displayProfilePhotoOptions ? 'Close Window' : 'Change Photo'}
            </div>
          )}
        </div>
        <div
          className={cn(css.options, {
            [css.displaying]: displayProfilePhotoOptions,
          })}
        >
          {profilePhotos.map((photo, indexOfPhoto) => (
            <ProfilePhotoOption
              key={photo}
              photo={photo}
              indexOfPhoto={indexOfPhoto}
              onOwnPage={onOwnPage}
              displayProfilePhotoOptions={displayProfilePhotoOptions}
              setTempPhotoOption={setTempPhotoOption}
            />
          ))}
        </div>
        <div className={css.names}>
          <h1>{desiredUser.name}</h1>
          <h3 className={css.username}>{desiredUser.username}</h3>
        </div>
        <div className={css.stats}>
          <div className={cn(css.stat)}>Sets: {desiredUser.sets.length}</div>
          <div className={cn(css.stat)}>
            Flashcards: {desiredUser.flashcards.length}
          </div>
        </div>
      </div>
      <div className={css.sets}>
        <h2 className={css.title}>Sets:</h2>
        <div className={css.display}>
          {desiredUser.sets.map((set) => (
            <UserSetItem key={set.id} set={set} />
          ))}
        </div>
        <div className={css.gap} />
      </div>
      <div className={css.sets}>
        <h2 className={css.title}>Flashcards:</h2>
        <div className={css.display}>
          {desiredUser.flashcards.map((flashcard) => (
            <UserFlashcardItem key={flashcard.id} flashcard={flashcard} />
          ))}
        </div>
        <div className={css.gap} />
      </div>
    </div>
  ) : (
    <div className={css.loading}>
      <div className={css.text}>Loading User...</div>
    </div>
  );
};

export default UserInformation;
