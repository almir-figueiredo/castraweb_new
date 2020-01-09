import React from 'react';
import LogoFile from '~/assets/horizontal_logo.png';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/student/actions';


import { Container, Logo, LogoutLink, LogoutLinkText } from './styles';

export default function HeaderTitle() {
  const dispatch = useDispatch();

  async function handleSubmit() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Logo source={LogoFile} />
      <LogoutLink onPress={()=>{handleSubmit}}>
        <LogoutLinkText>SAIR</LogoutLinkText>
      </LogoutLink>
    </Container>
  );
}
