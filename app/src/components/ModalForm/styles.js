import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
`;

export const BottomBar = styled.div`
  display: flex;
  margin-top: 10px;
  flex: 1;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 142px;
    border-radius: 4px;
    border: 0;
    font-weight: bold;
    background-color: ${colors.azulIbram};
    color: #fff;
    border: 1px solid #dddddd;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.03, `${colors.azulIbram}`)};
    }
  }

  .modalDialog {
    position: fixed;
    font-family: Arial, Helvetica, sans-serif;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99999;
    opacity: 0;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
    pointer-events: none;
  }
  .modalDialog:target {
    opacity: 1;
    pointer-events: auto;
  }

  .modalDialog > div {
    width: 400px;
    position: relative;
    margin: 10% auto;
    padding: 5px 20px 13px 20px;
    border-radius: 10px;
    background: #fff;
    background: -moz-linear-gradient(#fff, #999);
    background: -webkit-linear-gradient(#fff, #999);
    background: -o-linear-gradient(#fff, #999);
  }
  .close {
    background: #606061;
    color: #ffffff;
    line-height: 25px;
    position: absolute;
    right: -12px;
    text-align: center;
    top: -10px;
    width: 24px;
    text-decoration: none;
    font-weight: bold;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    -moz-box-shadow: 1px 1px 3px #000;
    -webkit-box-shadow: 1px 1px 3px #000;
    box-shadow: 1px 1px 3px #000;
  }

  .close:hover {
    background: #00d9ff;
  }
`;

export const ModalForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin: 30px 30px 10px 14px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-bottom: 20px;
  }

  strong {
    font-size: 14px;
    color: #444444;
    margin-bottom: 5px;
  }

  span {
    color: red;
  }

  input {
    background: #ffffff;
    width: 100%;
    height: 45px;
    border-radius: 25px;
    border: solid 1px ${colors.azulIbram};

    font-size: 16px;
    color: #666666;
    padding-left: 15px;

    &:focus {
      border-color: #7159c1 !important;
    }
  }

  .fullSize {
    grid-column: 1/4;
  }
  .middleSize {
    grid-column: 2/4;
  }
`;
