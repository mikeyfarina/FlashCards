import react from "react";
import Button from "./Button";

const Form = ({ inputText, setInputText }) => {
  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };
  return (
    <div className="flashcard-form">
      <input onChange={inputChangeHandler} value={inputText} type="text" />
      <Button text="search" />
    </div>
  );
};

export default Form;
