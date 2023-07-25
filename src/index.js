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
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#e5e5e5"
    },
  },
  typography: {
    menu: {
      fontSize: 16,
      fontWeight: 600,
      fontStyle: "normal",
      color: "#6E7D87"
    },
    menuSelected: {
      fontSize: 16,
      fontWeight: 600,
      fontStyle: "normal",
      color: "#FFFFFF",
      background: '#00AEEF'
    },
  }
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
