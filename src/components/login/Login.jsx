import React from 'react';

const Login = (props) => {

    const login = () => {

    }

    const goJoin = () => {

        props.setLoginToggle(false);
    }

    return (
        <div>
            <div>로그인</div>
            <button onClick={login}>로그인</button>
            <button onClick={goJoin}>회원가입</button>
        </div>
    );
};

export default Login;