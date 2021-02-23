import React from 'react';

const FormContainer = ({ children }) => {
  const containerStyle = {
    background: 'white',
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    justifyContent: 'center',
    padding: '5vh 5vw',
    borderRadius: '10px',
    boxShadow: '0 0 55px rgba(1, 1, 1, 0.4), 0 0 5px rgba(1, 1, 1, .5)',
    margin: '3vh auto',
    alignItems: 'center',
  };

  return (
    <div className="form-container" style={containerStyle}>
      {children}
    </div>
  );
};

export default FormContainer;
