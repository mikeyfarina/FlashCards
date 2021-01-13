import React from 'react';

const Form = ({ inputText, setInputText, className }) => {
  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  return (
    <div className={className}>
      <input
        onChange={inputChangeHandler}
        value={inputText}
        type="text"
        placeholder={'Search...'}
      />
    </div>
  );
};

export default Form;
