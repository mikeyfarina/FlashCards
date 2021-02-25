import React from 'react';
import css from './FormContainer.module.css';

const FormContainer = ({ children }) => (
  <div className={css.container}>{children}</div>
);

export default FormContainer;
