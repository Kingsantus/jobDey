import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from '../context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a React root using the new createRoot API
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);