import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./css/index.module.css";
import { UserProvider } from "./contexts/User";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
  );