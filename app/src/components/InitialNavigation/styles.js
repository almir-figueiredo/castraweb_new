import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column;

  width: 100%;
  max-height: 600px;
  background: #c9c4c1;

  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  border: solid 1px #ddd;
  padding: 0 30px;
  strong {
    display: flex;
    margin: 5px 0px 0px 0px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  img {
    height: 200px;
    align-self: center;
    margin: 20px 10px;
  }

  nav {
    display: flex;
    align-items: center;
  }
`;

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: row;
  height: 100%;

  text-align: center;
  align-items: center;
  justify-content: center;

  color: #999;
  font-size: 15px;
  font-weight: bold;
  margin-right: 20px;
  transition: color 0.2s;

  &:first-child {
    margin-left: 30px;
  }

  &:hover {
    color: ${colors.primary};
    cursor: pointer;
  }
`;
