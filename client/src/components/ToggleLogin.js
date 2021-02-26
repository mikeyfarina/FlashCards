import React, { useImperativeHandle, useState, useCallback } from 'react';
import cn from 'classnames';
import css from '../styles/Header.module.css';

const ToggleLogin = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? 'none' : '' };
  const showWhenVisible = { display: isVisible ? '' : 'none' };

  ToggleLogin.displayName = 'ToggleLogin';

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  useImperativeHandle(ref, () => toggleVisibility);

  return (
    <div
      className={cn(
        css.login,
        { [css.visible]: isVisible },
        { [css.invisible]: !isVisible }
      )}
    >
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className={css.loginBtn}
          type="button"
        >
          login
        </button>
      </div>
      <div style={showWhenVisible} className={css.toggle} data-toggle-content>
        {props.children}
        <button onClick={toggleVisibility} className={css.cancel} type="button">
          cancel
        </button>
      </div>
    </div>
  );
});

export default ToggleLogin;
