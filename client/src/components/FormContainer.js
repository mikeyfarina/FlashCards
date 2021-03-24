import React from 'react';
import css from './FormContainer.module.css';

const FormContainer = ({ children }) => (
  <div className={css.container}>
    <div className={css.subcontainer}>{children}</div>
  </div>
);

export default FormContainer;
