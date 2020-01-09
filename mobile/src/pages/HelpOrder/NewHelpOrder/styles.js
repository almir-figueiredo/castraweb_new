import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Wrapper = styled.KeyboardAvoidingView`
  background-color: #c5c5c5;
  display: flex;
  flex: 1;
  align-content: center;
`;

export const Container = styled.View`
  align-content: center;
  justify-content: center;
`;

export const FormInput = styled(Input)`
  margin: 20px 20px 10px 20px;
  align-items: center;
  justify-content: center;
`;

export const HelpButton = styled(Button)`
  margin: 10px 20px;
`;
