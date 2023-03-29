import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { memberApis } from '../apis/member';
import { StValitext } from '../styles/common/input.styled';
import { StButton } from '../styles/common/button.styled';
import { StInput } from '../styles/common/input.styled';
import {
  StBodyWrap,
  StButtonWrap,
  StInputWrap,
} from '../styles/common/body.styled';

const JoinPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      navigate('/todo');
    }
  }, []);

  //가입버튼 상태
  const [joinDisabled, setJoinDisabled] = useState(true);
  //가입정보 상태
  const [joinData, setJoinData, joinDataHandle] = useInput({
    email: '',
    password: '',
    matchPassword: '',
  });

  useEffect(() => {
    setJoinDisabled(!validation('joinDisabled'));
  }, [joinData]);

  const validation = (type, value) => {
    let result = false;

    switch (type) {
      case 'checkEmail':
        result = /([\w-.]+)@([\w-.]+)$/.test(value);
        break;
      case 'checkPasswordLength':
        result = value.length > 7;
        break;
      case 'matchPassword':
        result = joinData.password === value;
        break;
      case 'joinDisabled':
        result =
          /([\w-.]+)@([\w-.]+)$/.test(joinData.email) &&
          joinData.password.length > 7 &&
          joinData.password === joinData.matchPassword;
        break;
    }
    return result;
  };

  const join = async () => {
    const result = await memberApis.signupAX(joinData);
    if (result.status === 201) {
      alert('회원가입 완료!');
      navigate('/signin');
    }
  };

  const cansleJoin = () => {
    setJoinData({
      email: '',
      password: '',
      matchPassword: '',
    });
    navigate('/signin');
  };

  return (
    <Layout>
      <StBodyWrap>
        <StInputWrap>
          <div>회원가입</div>
          <div>
            <StInput
              type='text'
              data-testid='email-input'
              name='email'
              onChange={joinDataHandle}
              value={joinData.email || ''}
              placeholder='Email형식 아이디'
            />
          </div>
          <StValitext textColor={'#f96854'}>
            {!validation('checkEmail', joinData.email) &&
              joinData.email !== '' &&
              'Email 형식이 아니에요.'}
          </StValitext>
          <StValitext textColor={'#22B14C'}>
            {validation('checkEmail', joinData.email) &&
              '올바른 Email 형식이에요'}
          </StValitext>

          <div>
            <StInput
              type='password'
              data-testid='password-input'
              name='password'
              onChange={joinDataHandle}
              value={joinData.password || ''}
              placeholder='비밀번호 8자 이상'
            />
          </div>
          <StValitext textColor={'#f96854'}>
            {!validation('checkPasswordLength', joinData.password) &&
              joinData.password !== '' &&
              '비밀번호는 8자 이상 입력해주세요.'}
          </StValitext>

          <div>
            <StInput
              type='password'
              data-testid='password-input'
              name='matchPassword'
              onChange={joinDataHandle}
              value={joinData.matchPassword || ''}
              placeholder='비밀번호 확인'
            />
          </div>
          <StValitext textColor={'#f96854'}>
            {!validation('matchPassword', joinData.matchPassword) &&
              joinData.matchPassword !== '' &&
              '비밀번호가 다릅니다.'}
          </StValitext>
          <StValitext textColor={'#22B14C'}>
            {validation('matchPassword', joinData.matchPassword) &&
              joinData.matchPassword !== '' &&
              '비밀번호가 일치합니다.'}
          </StValitext>
        </StInputWrap>
        <StButtonWrap>
          <StButton
            data-testid='signup-button'
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={join}
            disabled={joinDisabled}>
            가입하기
          </StButton>
          <StButton
            color='#ffff'
            backgroundColor='#F0A4BD'
            onClick={cansleJoin}>
            취소
          </StButton>
        </StButtonWrap>
      </StBodyWrap>
    </Layout>
  );
};

export default JoinPage;
