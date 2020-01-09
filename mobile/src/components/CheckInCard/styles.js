import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid #dddddd;
  background: #fff;
  margin: 10px 20px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CheckInText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444444;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: center;
`;

export const TimeText = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: right;
`;
