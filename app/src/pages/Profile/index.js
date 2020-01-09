import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <hr />
        <Input name="password" type="oldPassword" placeholder="Sua senha" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="password"
          type="confirmpassword"
          placeholder="Repetir nova senha"
        />

        <button type="submit">Atualizar Perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
