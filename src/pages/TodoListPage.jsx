import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { todoListApis } from '../apis/todoList';
import Todo from '../components/Todo';
import useInput from '../hooks/useInput';
import Layout from '../layouts/Layout';

const TodoListPage = () => {

    const [createTodo, setCreateTodo, createTodoHandle] = useInput({
        todo: "",
    });

    const [editTodo, setEditTodo, editTodoHandle] = useInput({
        todo: "",
    });

    const [todos, setTodos] = useState([]);

    const addTodo = async () => {
        if (createTodo.todo.trim() === "") return;

        const result = await todoListApis.createTodoAX(createTodo);

        if (result.status === 201) {
            setCreateTodo({ todo: "", });
            getTodos();
        }
    }

    const getTodos = async () => {
        const result = await todoListApis.getTodosAX();

        if (result.status === 200) {
            const custom = result.data.map((todo) => {
                return { ...todo, isEdit: false }
            })
            setTodos(custom);
        }
    }

    const updataHandle = (index) => {
        const changeEdit = todos.map((todo, i) => {
            return i === index ? { ...todo, isEdit: !todo.isEdit } : { ...todo, isEdit: false }
        })
        setEditTodo({ todo: todos[index].todo });
        setTodos(changeEdit);
    }

    const updateTodo = async (type, todo) => {
        const result = await todoListApis.updateTodoAX({
            id: todo.id,
            todo: {
                todo: type === "todo" ? editTodo.todo : todo.todo,
                isCompleted: type === "checked" ? !todo.isCompleted : todo.isCompleted,
            }
        });

        if (result.status === 200) getTodos();
    }

    const deleteTodo = async (id) => {
        if (!window.confirm('삭제하시겠습니까?')) return;

        const result = await todoListApis.deleteTodoAX(id);

        if (result.status === 204) getTodos();
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <Layout>
            <StTodoListWrap>
                <div>
                    <input data-testid="new-todo-input" name="todo" onChange={createTodoHandle} value={createTodo.todo || ""} placeholder="할 일을 작성해주세요." />
                    <button data-testid="new-todo-add-button" onClick={addTodo}>추가</button>
                </div>
                <ul>
                    {todos.map((todo, i) => {
                        return (
                            <Todo todo={todo} i={i}
                                updateTodo={updateTodo}
                                updataHandle={updataHandle}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                editTodoHandle={editTodoHandle}
                                key={todo.id} />
                        )
                    })}

                </ul>
            </StTodoListWrap>
        </Layout>
    );
};

export default TodoListPage;

const StTodoListWrap = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    ul {
        list-style:none;
   }
`