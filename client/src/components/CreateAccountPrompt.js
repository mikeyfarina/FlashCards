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
    <div className={cn(css.container, { [css.hidden]: !signupDisplayed })}>
      <button className={css.close} onClick={handleClose} type="button">
        x
      </button>
      <div className={css.imageContainer}>
        <div className={css.text}>Sign up to create new flashcards!</div>
        <Image />
        <div>
          <Link to="/home/createAccount" className={css.signupLink}>
            <button className={css.button} type="button">
              Sign up
            </button>
          </Link>
          <Link to="/home/login" className={css.loginLink}>
            <button className={css.button} type="button">
              Log in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPrompt;
