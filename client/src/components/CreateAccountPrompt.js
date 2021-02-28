import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import css from './CreateAccountPrompt.module.css';
import { ReactComponent as Image } from '../images/clipart/img1.svg';

const CreateAccountPrompt = () => {
  const [signupDisplayed, setSignupDisplayed] = useState(true);

  const handleClose = useCallback(() => {
    setSignupDisplayed(false);
  }, []);

  return (
    <div
      className={cn(
        css.container,
        { [css.displayed]: signupDisplayed },
        { [css.hidden]: !signupDisplayed }
      )}
    >
      <button className={css.close} onClick={handleClose} type="button">
        x
      </button>
      <div className={css.circle} />
      <h2 className={css.text}>Sign up to create new flashcards!</h2>
      <Image className={css.image} />
      <div className={css.buttons}>
        <Link to="/home/createAccount" className={css.signupLink}>
          <button className={cn(css.button, css.signup)} type="button">
            Sign up
          </button>
        </Link>
        <Link to="/home/login" className={css.loginLink}>
          <button className={cn(css.button, css.login)} type="button">
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;
