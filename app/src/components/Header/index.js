import React from 'react';
import { useDispatch } from 'react-redux';

import { Container, Content, Profile, NavItem } from './styles';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo_ibram.png';

export default function Header() {
  const dispatch = useDispatch();
  // const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="CastraWeb" />
        </nav>
        <nav>
          <NavItem to="/clinics">CLÍNICAS</NavItem>
          <NavItem to="/operators">OPERADORES</NavItem>
          <NavItem to="/users">USUÁRIOS</NavItem>
          <NavItem to="/clinics">PAINEL DE CONTROLE</NavItem>
        </nav>
      </Content>

      <Profile>
        <strong>Nome Teste</strong>
        <button type="button" onClick={handleSignOut}>
          Logout
        </button>
      </Profile>
    </Container>
  );
}
