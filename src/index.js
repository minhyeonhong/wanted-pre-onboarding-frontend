import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { HttpClient } from './httpClient/httpClient';
import { LocalTokenRepository } from './repository/LocalTokenRepository';
import { AuthProvider } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import { AuthService } from './service/AuthService';
import { TodoService } from './service/TodoService';

const localTokenRepository = new LocalTokenRepository();
const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL,
  localTokenRepository
);
const authService = new AuthService(httpClient, localTokenRepository);
const todoService = new TodoService(httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider authService={authService}>
    <TodoProvider todoService={todoService}>
      <App />
    </TodoProvider>
  </AuthProvider>
);
