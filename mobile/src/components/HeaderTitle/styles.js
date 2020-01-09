import styled from 'styled-components/native';
import Button from '~/components/Button'

export const Container = styled.View`
  align-items: center;
  justify-content: space-between;
  background: #fff;
  flex-direction: row;
`;

export const Logo = styled.Image`
  margin: 20px;
`;
export const LogoutLink = styled.TouchableOpacity`
  margin-right: 20px;
`;
export const LogoutLinkText = styled.Text`
  font-weight:bold;
  color: #ee4e62;
`;
