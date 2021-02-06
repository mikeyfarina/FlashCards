import React from 'react';

const FormContainer = (props) => {
  const containerStyle = {
    background: 'white',
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    padding: '5vh 5vw',
    borderRadius: '10px',
    boxShadow: '0 0 55px rgba(1, 1, 1, 0.4), 0 0 5px rgba(1, 1, 1, .5)',
    margin: '12.5vh auto',
    alignItems: 'center',
  };

  return (
    <div className="form-container" style={containerStyle}>
      {props.children}
    </div>
  );
};

export default FormContainer;
