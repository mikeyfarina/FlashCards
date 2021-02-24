import React, { useImperativeHandle, useState } from 'react';
import HeaderStyles from '../styles/Header.module.css';

const ToggleLogin = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? 'none' : '' };
  const showWhenVisible = { display: isVisible ? '' : 'none' };

  ToggleLogin.displayName = 'ToggleLogin';

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => toggleVisibility);

  return (
    <div
      className={`${HeaderStyles.login} ${
        isVisible ? HeaderStyles.visible : HeaderStyles.invisible
      }`}
    >
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className={HeaderStyles.loginBtn}
          type="button"
        >
          login
        </button>
      </div>
      <div
        style={showWhenVisible}
        className="ToggleContainerContent"
        data-toggle-content
      >
        {props.children}
        <button
          onClick={toggleVisibility}
          className={HeaderStyles.cancel}
          type="button"
        >
          cancel
        </button>
      </div>
    </div>
  );
});

export default ToggleLogin;
