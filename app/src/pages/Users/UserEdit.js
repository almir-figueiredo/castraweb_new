/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Select, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, UserForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function UserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    async function loadUser() {
      const { data } = await api.get(`users/${id}`);
      setUser(data);
    }
    if (id) {
      loadUser();
    }
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    cpf: Yup.string().required(),
    birthday: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    phone: Yup.string().required(),
    address: Yup.string().required(),
    district: Yup.string().required(),
    zipcode: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(6),
    group_mantainer: Yup.boolean().required(),
  });

  async function handleSubmit(data) {
    await api.put(`users/${id}`, data);
    return history.goBack();
  }

  const options = [
    { id: true, title: 'SIM' },
    { id: false, title: 'NÃO' },
  ];

  return (
    <Container>
      <DetailsMenu name="Usuário" form="userForm" edit />

      <Content>
        <UserForm
          schema={schema}
          id="userForm"
          onSubmit={handleSubmit}
          initialData={user}
        >
          <div className="fullSize">
            <strong>NOME COMPLETO</strong>
            <Input name="name" />
          </div>
          <div>
            <strong>CPF</strong>
            <Input name="cpf" />
          </div>
          <div>
            <strong>DATA DE NASCIMENTO</strong>
            <Input name="birthday" type="date" />
          </div>
          <div>
            <strong>ENDEREÇO DE E-MAIL</strong>
            <Input name="email" />
          </div>
          <div className="fullSize">
            <strong>ENDEREÇO COMPLETO</strong>
            <Input name="address" />
          </div>
          <div>
            <strong>TELEFONE</strong>
            <Input name="phone" />
          </div>
          <div>
            <strong>REGIÃO ADMINISTRATIVA</strong>
            <Input name="district" />
          </div>
          <div>
            <strong>CEP</strong>
            <Input name="zipcode" />
          </div>
          <div>
            <strong>GRANDES PLANTÉIS?</strong>
            <Select name="group_mantainer" options={options} />
          </div>
        </UserForm>
      </Content>
    </Container>
  );
}
