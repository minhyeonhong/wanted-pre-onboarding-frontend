import React from 'react';

const Todo = ({ todo, i, updateTodo, updataHandle, deleteTodo, editTodo, editTodoHandle }) => {
    return (
        <li>
            <label>
                <input type="checkbox" defaultChecked={todo.isCompleted} onClick={() => { updateTodo("checked", todo) }} />
                {todo.isEdit ?
                    <input type="text" data-testid="modify-input" name="todo" onChange={editTodoHandle} value={editTodo.todo || ""} />
                    :
                    <span>{todo.todo}</span>
                }
            </label>
            {todo.isEdit ?
                <>
                    <button data-testid="submit-button" onClick={() => { updateTodo("todo", todo) }}>제출</button>
                    <button data-testid="cancel-button" onClick={() => { updataHandle(i) }}>취소</button>
                </>
                :
                <>
                    <button data-testid="modify-button" onClick={() => { updataHandle(i) }}>수정</button>
                    <button data-testid="delete-button" onClick={() => { deleteTodo(todo.id) }}>삭제</button>
                </>
            }

        </li>
    );
};

export default Todo;