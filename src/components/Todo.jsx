import { useState } from 'react';
import styled from 'styled-components';
import { StButton } from '../styles/common/button.styled';
import { StInput } from '../styles/common/input.styled';
import useInput from '../hooks/useInput';
import { useTodo } from '../contexts/TodoContext';

const Todo = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { update, remove } = useTodo();
  const editHandle = () => {
    setIsEdit(!isEdit);
  };

  const [editTodo, setEditTodo, editTodoHandle] = useInput(todo);

  const updateTodo = (type, todo) => {
    switch (type) {
      case 'checked': {
        update({ ...todo, isCompleted: !todo.isCompleted });

        break;
      }
      default: {
        if (editTodo.todo.trim() === '') return;

        const isUpdate = update({ ...todo, todo: editTodo.todo });

        if (isUpdate) editHandle();

        break;
      }
    }
  };

  const deleteTodo = id => {
    remove(id);
  };

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
        {isEdit ? (
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
      {isEdit ? (
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
              editHandle();
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
              setEditTodo(todo);
              editHandle();
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
