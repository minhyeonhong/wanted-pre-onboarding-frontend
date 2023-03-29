import React from 'react';
import styled from 'styled-components';
import { StButton } from '../styles/common/button.styled';
import { StInput } from '../styles/common/input.styled';

const Todo = ({
  todo,
  i,
  updateTodo,
  updataHandle,
  deleteTodo,
  editTodo,
  editTodoHandle,
}) => {
  return (
    <StTodoWrap>
      <label>
        <input
          type='checkbox'
          defaultChecked={todo.isCompleted}
          onClick={() => {
            updateTodo('checked', todo);
          }}
        />
        {todo.isEdit ? (
          <StInput
            type='text'
            data-testid='modify-input'
            width='400px'
            name='todo'
            onChange={editTodoHandle}
            value={editTodo.todo || ''}
          />
        ) : (
          <span>{todo.todo}</span>
        )}
      </label>
      {todo.isEdit ? (
        <StButtonWrap>
          <StButton
            data-testid='submit-button'
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={() => {
              updateTodo('todo', todo);
            }}>
            제출
          </StButton>
          <StButton
            data-testid='cancel-button'
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={() => {
              updataHandle(i);
            }}>
            취소
          </StButton>
        </StButtonWrap>
      ) : (
        <StButtonWrap>
          <StButton
            data-testid='modify-button'
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={() => {
              updataHandle(i);
            }}>
            수정
          </StButton>
          <StButton
            data-testid='delete-button'
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={() => {
              deleteTodo(todo.id);
            }}>
            삭제
          </StButton>
        </StButtonWrap>
      )}
    </StTodoWrap>
  );
};

export default Todo;

const StTodoWrap = styled.li`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const StButtonWrap = styled.div`
  display: flex;
  gap: 5px;
`;
