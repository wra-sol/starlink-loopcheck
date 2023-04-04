// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {QueryProvider} from './QueryContext';
import App from './App';
import './index.css';
import './fonts/fonts.css';
import theme from './theme';
import {ThemeProvider} from '@mui/material/styles';

ReactDOM.render (
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById ('root')
);
