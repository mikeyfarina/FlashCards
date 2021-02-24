import React from 'react';

const Button = ({ className, text, onClick, disabled, testingTag }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
    type="button"
    data-testing-tag={testingTag}
  >
    {text}
  </button>
);

export default Button;
