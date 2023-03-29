import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import TodoListPage from '../pages/TodoListPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signin' element={<LoginPage />} />
        <Route path='/signup' element={<JoinPage />} />
        <Route path='/todo' element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
