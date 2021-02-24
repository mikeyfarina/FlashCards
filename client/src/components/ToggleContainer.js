import React, { useImperativeHandle, useState } from 'react';

const ToggleContainer = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? 'none' : '' };
  const showWhenVisible = { display: isVisible ? '' : 'none' };

  ToggleContainer.displayName = 'ToggleContainer';

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => toggleVisibility);

  return (
    <div
      className={`${props.parentDivClassName || ''} ${
        isVisible ? 'visible' : 'invisible'
      }`}
    >
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className={`${props.buttonLabel}-outside-button`}
          style={{ border: 'none', outline: 'none' }}
          type="button"
        >
          {props.buttonLabel}
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
          className={`${props.buttonLabel}-cancel-button`}
          style={{
            border: 'none',
            outline: 'none',
            position: 'absolute',
            top: '1%',
            right: '2%',
          }}
          type="button"
        >
          {props.cancelButtonText || 'cancel'}
        </button>
      </div>
    </div>
  );
});

export default ToggleContainer;
