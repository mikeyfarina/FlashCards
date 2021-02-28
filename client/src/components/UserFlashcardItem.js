import React from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import css from './UserItem.module.css';
import UserList from '../styles/UserListItem.module.css';

const UserFlashcardItem = ({ flashcard }) => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push(`/flashcards/${flashcard.set.id}/${flashcard.id}`);
  }, [history, flashcard.set.id, flashcard.id]);

  return (
    <div
      className={cn(css.item, UserList.item)}
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <div className={css.itemTitle}>
        <h3>{flashcard.front}</h3>
      </div>
      <h5 className={css.within}>
        from: <strong>{flashcard.set && flashcard.set.title}</strong>
      </h5>
    </div>
  );
};

export default UserFlashcardItem;
