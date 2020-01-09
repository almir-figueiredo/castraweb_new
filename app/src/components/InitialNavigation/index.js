import React from 'react';

import { Container, Content, NavItem } from './styles';

import logo from '../../assets/logo_ibram.png';

export default function InitialNavigation() {
  return (
    <Container>
      <strong>CASTRAWEB - BRASÍLIA AMBIENTAL</strong>
      <Content>
        <img src={logo} alt="Castraweb" />
        <nav>
          <NavItem to="/signin-clinic">ENTRAR NA CLÍNICA</NavItem>
          <NavItem to="/signin-operator">ENTRAR COMO OPERADOR</NavItem>
        </nav>
      </Content>
    </Container>
  );
}
