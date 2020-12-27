import React from 'react';

const Button = ({className, text, onClick, disabled}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
