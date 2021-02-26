import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import css from './UserItem.module.css';
import UserList from '../styles/UserListItem.module.css';

const UserSetItem = ({ set }) => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push(`/flashcards/${set.id}`);
  }, [history]);

  return (
    <div
      className={cn(css.item, UserList.item)}
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <div className={css.itemTitle}>
        <h3>{set.title}</h3>
      </div>
      <div className={css.size}>
        Size: <strong>{set.flashcards.length}</strong>
      </div>
    </div>
  );
};

export default UserSetItem;
