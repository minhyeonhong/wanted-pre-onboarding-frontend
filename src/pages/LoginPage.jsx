import React, { useState } from 'react';

import Layout from '../layouts/Layout';
import Login from '../components/login/Login';
import Join from '../components/login/Join';
import styled from 'styled-components';


const LoginPage = () => {

    const [loginToggle, setLoginToggle] = useState(true);

    return (
        <Layout>
            <StLoginPageWrap>
                {loginToggle ?
                    <Login setLoginToggle={setLoginToggle} />
                    :
                    <Join setLoginToggle={setLoginToggle} />
                }
            </StLoginPageWrap>
        </Layout>
    );
};

export default LoginPage;

const StLoginPageWrap = styled.div`
    
`