import React from 'react';

import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Layout = (props) => {
    return (
        <StLayoutWrap>
            <Header />
            <StBody>
                {props.children}
            </StBody>
            <Footer />
        </StLayoutWrap>
    );
};

export default Layout;

const StLayoutWrap = styled.div`
    text-align: center;
    
`

const StBody = styled.div`
    min-height : 90vh;
`