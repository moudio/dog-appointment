import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import App from './components/App';
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
