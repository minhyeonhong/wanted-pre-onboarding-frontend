import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_email");
        navigate("/");
    }

    return (
        <StHeaderWrap>
            {localStorage.getItem("access_token") !== null &&
                <div>
                    {localStorage.getItem("user_email")}님의 Todo List
                    <button onClick={logout}>로그아웃</button>
                </div>
            }
        </StHeaderWrap>
    );
};

export default Header;

const StHeaderWrap = styled.div`
    height : 10vh;
    background-color : pink;
`