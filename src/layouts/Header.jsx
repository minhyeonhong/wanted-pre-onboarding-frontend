import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { StButton } from '../styles/common/button.styled';

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    navigate('/');
  };

  return (
    <StHeaderWrap>
      {localStorage.getItem('access_token') !== null ? (
        <div>
          <span>{localStorage.getItem('user_email')}님의 Todo List</span>
          <StButton
            color='#F0A4BD'
            backgroundColor='#ffff'
            marginLeft='20px'
            onClick={logout}>
            로그아웃
          </StButton>
        </div>
      ) : (
        <div>wanted-pre-onboarding-frontend-assignment</div>
      )}
    </StHeaderWrap>
  );
};

export default Header;

const StHeaderWrap = styled.div`
  height: 5vh;
  line-height: 5vh;
  background-color: #f0a4bd;
  color: #ffff;
`;
