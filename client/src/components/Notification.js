import React from 'react';
import css from './Notification.module.css';

const Notification = ({ message }) => (
  <div className={css.container}>
    <div className={css.message}>{message}</div>
  </div>
);

export default Notification;
