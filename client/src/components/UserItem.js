import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import css from './UserItem.module.css';
import UserList from '../styles/UserListItem.module.css';

const UserItem = ({ set, flashcard }) => {
  const [itemIsSet, setItemIsSet] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (set) {
      setItemIsSet(true);
    } else if (flashcard) {
      setItemIsSet(false);
    }
  }, [flashcard, set]);

  const handleSetClick = useCallback(() => {
    if (set) history.push(`/flashcards/${set.id}`);
  }, [history, set]);

  const handleFlashcardClick = useCallback(() => {
    if (flashcard)
      history.push(`/flashcards/${flashcard.set.id}/${flashcard.id}`);
  }, [history, flashcard]);

  return (
    <div
      className={cn(css.item, UserList.item)}
      onClick={itemIsSet ? handleSetClick : handleFlashcardClick}
      role="button"
      tabIndex="0"
    >
      <div className={css.itemTitle}>
        {itemIsSet ? set?.title : flashcard?.front}
      </div>
      <div
        className={cn({ [css.size]: itemIsSet }, { [css.within]: !itemIsSet })}
      >
        <strong>
          {itemIsSet
            ? `Size: ${set?.flashcards?.length}`
            : `from: ${flashcard?.set?.title}`}
        </strong>
      </div>
    </div>
  );
};

export default UserItem;
