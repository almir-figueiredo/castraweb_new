import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import colors from '../../styles/colors';

export const ContainerSchedules = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
`;
export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  background: #fff;
  border-radius: 4px;
`;

export const ScheduleForm = styled(Form)`
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

export const TableSchedules = styled.table`
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
