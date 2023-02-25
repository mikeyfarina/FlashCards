import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import css from './UserInformation.module.css';
import ProfilePhotoOption from '../components/ProfilePhotoOption';
import UserItem from '../components/UserItem';
import userService from '../services/userService';
import profilePhotos from '../utils/profilePhotoLoader';

const UserInformation = ({ loggedInUser }) => {
  const [desiredUser, setDesiredUser] = useState(null);
  const [displayProfilePhotoOptions, setDisplayProfilePhotoOptions] =
    useState(false);
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
          {desiredUser.name}
          <div className={css.username}>{desiredUser.username}</div>
        </div>
        <div className={css.stats}>
          <div className={cn(css.stat)}>Sets: {desiredUser.sets.length}</div>
          <div className={cn(css.stat)}>
            Flashcards: {desiredUser.flashcards.length}
          </div>
        </div>
      </div>
      <div className={css.sets}>
        <div className={css.title}>Sets:</div>
        <div className={css.collection}>
          {desiredUser.sets.map((set) => (
            <UserItem key={set.id} set={set} />
          ))}
          <div className={css.padding} />
        </div>
      </div>
      <div className={css.sets}>
        <div className={css.title}>Flashcards:</div>
        <div className={css.collection}>
          {desiredUser.flashcards.map((flashcard) => (
            <UserItem key={flashcard.id} flashcard={flashcard} />
          ))}
          <div className={css.padding} />
        </div>
      </div>
    </div>
  ) : (
    <div className={css.loading}>Loading User...</div>
  );
};

export default UserInformation;
