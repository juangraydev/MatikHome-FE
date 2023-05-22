import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from "./store/config";

const theme = createTheme({
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 300,
  //     md: 450,
  //     lg: 600,
  //     xl: 1536,
  //   },
  // },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={ store }>
        <PersistGate persistor={ persistor }>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
