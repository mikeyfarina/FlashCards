import PropTypes from 'prop-types';
import React, { useImperativeHandle, useState } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  Togglable.displayName = 'Togglable';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div
      className={`${props.parentDivClassName} ${
        visible ? 'visible' : 'invisible'
      }`}
    >
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className={`${props.buttonLabel}-outside-button`}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button
          onClick={toggleVisibility}
          className={`${props.buttonLabel}-cancel-button`}
        >
          cancel
        </button>
      </div>
    </div>
  );
});

export default Togglable;
