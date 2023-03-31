import { useEffect } from 'react';
import Layout from '../layouts/Layout';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { StValitext } from '../styles/common/input.styled';
import { StButton } from '../styles/common/button.styled';
import { StInput } from '../styles/common/input.styled';
import {
  StBodyWrap,
  StButtonWrap,
  StInputWrap,
} from '../styles/common/body.styled';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData, loginDataHandle] = useInput({
    email: '',
    password: '',
  });

  const { login: loginService } = useAuth();

  const validation = (type, value) => {
    let result = false;

    switch (type) {
      case 'checkEmail':
        result = /([\w-.]+)@([\w-.]+)$/.test(value);
        break;
      case 'checkPasswordLength':
        result = value.length > 7;
        break;
    }
    return result;
  };

  const login = async () => {
    const result = await loginService(loginData.email, loginData.password);
    if (result.status === 200) {
      alert('로그인 성공!');
      window.location.replace('/todo');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      navigate('/todo');
    }
  }, []);

  return (
    <Layout>
      <StBodyWrap>
        <StInputWrap>
          <div>로그인</div>
          <div>
            <StInput
              type='text'
              data-testid='email-input'
              name='email'
              onChange={loginDataHandle}
              value={loginData.email || ''}
              placeholder='Email 아이디'
            />
          </div>
          <StValitext textColor={'#f96854'}>
            {!validation('checkEmail', loginData.email) &&
              loginData.email !== '' &&
              'Email 형식이 아니에요.'}
          </StValitext>

          <div>
            <StInput
              type='password'
              data-testid='password-input'
              name='password'
              onChange={loginDataHandle}
              value={loginData.password || ''}
              placeholder='비밀번호'
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  login();
                }
              }}
            />
          </div>
          <StValitext textColor={'#f96854'}>
            {!validation('checkPasswordLength', loginData.password) &&
              loginData.password !== '' &&
              '비밀번호는 8자 이상 입력해주세요.'}
          </StValitext>
        </StInputWrap>
        <StButtonWrap>
          <StButton
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={login}
            data-testid='signin-button'>
            로그인
          </StButton>
          <StButton
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={() => {
              navigate('/signup');
            }}
            data-testid='signup-button'>
            회원가입
          </StButton>
        </StButtonWrap>
      </StBodyWrap>
    </Layout>
  );
};

export default LoginPage;
