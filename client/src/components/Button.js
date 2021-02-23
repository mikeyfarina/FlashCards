import React from 'react';

const Button = ({ className, text, onClick, disabled }) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {text}
  </button>
);

export default Button;
