// TodoContext
// todos
// create

import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext(null);

export const useTodo = () => useContext(TodoContext);

export function TodoProvider({ children, todoService }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.get().then(setTodos);
  }, [todoService, setTodos]);

  const create = async todo => {
    const newTodo = await todoService.create(todo);
    setTodos(prev => [...prev, newTodo]);
  };

  const update = async editTodo => {
    const isUpdate = await todoService.update(editTodo);

    if (isUpdate)
      setTodos(
        todos.map(todo =>
          todo.id === editTodo.id
            ? {
                ...todo,
                todo: editTodo.todo,
                isCompleted: editTodo.isCompleted,
              }
            : todo
        )
      );

    return isUpdate;
  };

  const remove = async id => {
    if (!window.confirm('삭제하시겠습니까?')) return;

    const isRemove = await todoService.remove(id);

    if (isRemove) setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, create, update, remove }}>
      {children}
    </TodoContext.Provider>
  );
}
