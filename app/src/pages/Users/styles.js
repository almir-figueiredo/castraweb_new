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

export const ContainerAnimals = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
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

export const Menu = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 35px 0 20px 0;
  text-align: center;
  height: 36px;

  font-size: 24px;
  font-weight: bold;

  strong {
    color: #666;
  }
`;

export const MenuBar = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 142px;
    border-radius: 25px;
    border: 0;
    margin: 0 16px;
    font-weight: bold;
    background-color: ${colors.primary};
    color: #fff;
    border: 1px solid #dddddd;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.03, `${colors.primary}`)};
    }
  }
  .btnBack {
    background-color: #999;

    &:hover {
      background-color: ${darken(0.03, '#999')};
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 240px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    flex-grow: 1;
    color: #999;

    svg {
      position: absolute;
      margin-left: 4px;
    }

    input {
      font-size: 16px;
      padding-left: 32px;
      width: 100%;
      height: 100%;
      border: 1px solid #dddddd;
      border-radius: 4px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  background: #fff;
  border-radius: 4px;
`;

export const UserForm = styled(Form)`
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
    background: #fff;
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

  select {
    height: 45px;
    border-radius: 25px;
    border: solid 1px ${colors.azulIbram};
  }

  .fullSize {
    grid-column: 1/4;
  }
`;
export const AnimalsForm = styled(Form)`
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
    background: #fff;
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

  select {
    height: 45px;
    border-radius: 25px;
    border: solid 1px ${colors.azulIbram};
  }

  .fullSize {
    grid-column: 1/4;
  }
`;

export const Table = styled.table`
  display:flex;
  flex: 1;
  display: ${props => (props.visible ? 'table' : 'none')};
  border-collapse: collapse;
  empty-cells: show;

  table tbody thead th tr td {
    width: 100%;
    display: flex;
    flex: 1;
  }
  .second {
    background: gray;
  }


  /* .third {
    display: flex;
    flex: 1;
    width:100%;

    tbody {
      background: green;
      width:100%;
      display:flex;
    }
    tr {
      background: blue;
      width:100%;
      display:flex;
    }

    td {
      width: 100%;
    }

  }

  .fourth{
    flex:1;
  background: gray;
  border-color: red;
  font-size: 12px;
  width:100px;

  } */

  thead th {
    text-align: center;
    color: #444;
    font-weight: bold;
    font-size: 16px;
    padding: 10px 0px;
    overflow: hidden
    border-bottom: 1px solid #eee;

    &:nth-child(n + 2) {
      text-align: center;

    }
  }

  tbody td {
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid #eee;
    empty-cells: show;

    &:nth-child(n + 3) {
      text-align: center;
      empty-cells: show;
    }

    &:nth-child(4) {
      empty-cells: show;
    }

    button {
      margin: 0 10px;
      border: 0;
      background-color: #fff;
    }

    .edit {
      color: ${colors.btnPrimary};
    }
    .delete {
      color: ${colors.btnSecondary};
    }
  }
`;

export const TableAnimals = styled.table`
  flex: 1;
  display: table;
  border-collapse: collapse;
  border-color: black;

  thead th {
    text-align: left;
    color: #444;
    font-weight: bold;
    font-size: 14px;
    border-bottom: 1px solid;

    &:nth-child(n + 3) {
      text-align: center;
    }
    &:nth-child(n + 8) {
      text-align: center;
      border-color: #eee;
    }
  }

  tbody td {
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid;

    &:nth-child(n + 3) {
      text-align: center;
    }

    &:nth-child(n + 8) {
      border-color: #eee;
    }

    button {
      margin: 0 10px;
      border: 0;
      background-color: #fff;
    }

    .edit {
      color: ${colors.btnPrimary};
    }

    .delete {
      color: ${colors.btnSecondary};
    }
  }
`;
