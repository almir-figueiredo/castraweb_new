/* eslint-disable consistent-return */
import React from 'react';
import { Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, OperatorForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function OperatorNew() {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    cpf: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    registration: Yup.string().required(),
    type: Yup.string().required(),
    password: Yup.string().min(6),
  });

  async function handleSubmit(data) {
    await api.post('operators/', data);
    history.goBack();
  }

  const options = [
    { id: 'Operador', title: 'Operador' },
    { id: 'Analista', title: 'Analista' },
    { id: 'Executor de contrato', title: 'Executor de contrato' },
  ];

  return (
    <Container>
      <DetailsMenu name="Operador" form="operatorForm" edit={false} />

      <Content>
        <OperatorForm schema={schema} id="operatorForm" onSubmit={handleSubmit}>
          <div className="fullSize">
            <strong>NOME COMPLETO</strong>
            <Input name="name" />
          </div>
          <div>
            <strong>CPF</strong>
            <Input name="cpf" />
          </div>
          <div>
            <strong>ENDEREÇO DE E-MAIL</strong>
            <Input name="email" />
          </div>
          <div>
            <strong>MATRÍCULA</strong>
            <Input name="registration" />
          </div>
          <div>
            <strong>PERFIL</strong>
            <Select name="type" options={options} />
          </div>
          <div>
            <strong>SENHA INICIAL</strong>
            <Input name="password" />
          </div>
        </OperatorForm>
      </Content>
    </Container>
  );
}
