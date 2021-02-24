import React from 'react';
import Form from './FormContainer.module.css';

const FormContainer = ({ children }) => (
  <div className={Form.container}>{children}</div>
);

export default FormContainer;
