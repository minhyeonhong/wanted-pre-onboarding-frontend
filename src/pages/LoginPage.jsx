import React, { useEffect } from 'react';

import Layout from '../layouts/Layout';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { memberApis } from '../apis/member';


const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData, loginDataHandle] = useInput({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            navigate("/todo");
        }
    }, [])

    const login = async () => {
        const result = await memberApis.signAX(loginData);
        if (result.status === 200) {
            alert("로그인 성공!");
            localStorage.setItem("user_email", loginData.email);
            localStorage.setItem("access_token", result.data.access_token);
            navigate("/todo");
        }
    }



    return (
        <Layout>
            <StLoginPageWrap>
                <div><input type="text" data-testid="email-input" name="email" onChange={loginDataHandle} value={loginData.email || ""} placeholder="Email 아이디" /></div>
                <div><input type="password" data-testid="password-input" name="password" onChange={loginDataHandle} value={loginData.password || ""} placeholder="비밀번호" /></div>
                <div>
                    <button onClick={login} data-testid="signin-button">로그인</button>
                    <button onClick={() => { navigate("/signup") }}>회원가입</button>
                </div>
            </StLoginPageWrap>
        </Layout>
    );
};

export default LoginPage;

const StLoginPageWrap = styled.div`
    
`