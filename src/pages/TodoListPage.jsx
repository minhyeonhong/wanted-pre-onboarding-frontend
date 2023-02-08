import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { todoListApis } from '../apis/todoList';
import { useNavigate } from "react-router-dom";
import Todo from '../components/Todo';
import useInput from '../hooks/useInput';
import Layout from '../layouts/Layout';
import { StButton } from '../styles/common/button.styled';
import { StInput } from '../styles/common/input.styled';
import {
    StBodyWrap,
} from '../styles/common/body.styled';

const TodoListPage = () => {
    const navigate = useNavigate();
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

    useEffect(() => {
        if (localStorage.getItem("access_token") === undefined
            || localStorage.getItem("access_token") === null
            || localStorage.getItem("access_token") === "null"
            || localStorage.getItem("access_token").trim() === "") {
            navigate("/signin");
        }
    }, [])

    return (
        <Layout>
            <StBodyWrap>
                <StCreateWrap>
                    <StInput data-testid="new-todo-input" width="400px" name="todo" onChange={createTodoHandle} value={createTodo.todo || ""} placeholder="할 일을 작성해주세요." onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            addTodo();
                        }
                    }} />
                    <StButton data-testid="new-todo-add-button" color="#ffff" backgroundColor="#F0A4BD" marginLeft="5px" onClick={addTodo}>추가</StButton>
                </StCreateWrap>
                <StTodoListWrap>
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
            </StBodyWrap>
        </Layout>
    );
};

export default TodoListPage;

const StCreateWrap = styled.div`
    margin : 10px auto;
`

const StTodoListWrap = styled.div`
@media (max-width: 800px) {
    width : 90%;
}
width : 40%;
    padding : 10px;
    margin : 0 auto;
    ul {        
        height:70vh;
        border : 2px solid #F0A4BD;
        border-radius : 10px;
        overflow :  auto;        
        padding : 10px;
        list-style:none;        
   }
`