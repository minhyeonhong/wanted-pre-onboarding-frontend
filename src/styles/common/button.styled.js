import styled from 'styled-components';

const StButton = styled.button`
  min-width: 30px;
  width: ${props => props.width};
  border: none;
  line-height: 15px;
  font-weight: 400;
  font-size: 14px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  border-radius: 10px;
  padding: 5px 5px;
  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.margiTop};
  margin-right: ${props => props.marginRight};
  margin-bottom: ${props => props.marginBottom};
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export { StButton };
