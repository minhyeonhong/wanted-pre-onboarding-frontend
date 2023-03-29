import React from 'react';
import styled from 'styled-components';
import img_github from '../assets/images/github_white.png';

const Footer = () => {
  return (
    <StFooterWrap>
      © 2023. Min Hyeonhong. All rights reserved.
      <StImg
        href='https://github.com/minhyeonhong/wanted-pre-onboarding-frontend'
        target='_blank'>
        <img src={img_github} alt='git hub' />
      </StImg>
    </StFooterWrap>
  );
};

export default Footer;

const StFooterWrap = styled.div`
  min-height: 5vh;
  line-height: 5vh;
  background-color: #f0a4bd;
  color: #ffff;
  font-size: 13px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const StImg = styled.a`
  img {
    width: 5vh;
    height: 5vh;
  }
`;
