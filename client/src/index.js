import './fontawesome';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path={'/'}
      </Switch>
    </Router>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
