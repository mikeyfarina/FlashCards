import React, { useCallback } from 'react';
import cn from 'classnames';
import css from './ProfilePhotoOption.module.css';

const ProfilePhotoOption = ({
  photo,
  indexOfPhoto,
  onOwnPage,
  displayProfilePhotoOptions,
  setTempPhotoOption,
}) => {
  // need to get index of photo
  const handleOptionClick = useCallback(() => {
    if (onOwnPage) {
      setTempPhotoOption(indexOfPhoto.toString());
    }
  }, [onOwnPage, indexOfPhoto]);

  return (
    <div
      className={cn(css.option, {
        [css.displaying]: displayProfilePhotoOptions,
      })}
      onClick={handleOptionClick}
      role="button"
      tabIndex="0"
    >
      <img src={photo} alt="Profile option" className={css.pic} />
    </div>
  );
};

export default ProfilePhotoOption;
