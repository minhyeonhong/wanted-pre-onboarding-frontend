import styled from 'styled-components';

const StValitext = styled.div`
  font-size: 0.7rem;
  color: ${props => props.textColor};
`;
const StInput = styled.input`
  width: ${props => props.width};
  @media (max-width: 800px) {
    width: 200px;
  }
  padding: 4px;
  line-height: 15px;
  background-color: transparent;
  border-radius: 10px;
`;

export { StValitext, StInput };
