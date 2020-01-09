/* eslint-disable consistent-return */
import React from 'react';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, ClinicForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function ClinicNew() {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    cnpj: Yup.string().required(),
    technical_legal: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    phone: Yup.string().required(),
    phone_24h: Yup.string().required(),
    address: Yup.string().required(),
    zipcode: Yup.string().required(),
    district: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(6),
  });

  async function handleSubmit(data) {
    await api.post('clinics/', data);
    history.goBack();
  }

  return (
    <Container>
      <DetailsMenu name="Clínica" form="clinicForm" edit={false} />

      <Content>
        <ClinicForm schema={schema} id="clinicForm" onSubmit={handleSubmit}>
          <div className="fullSize">
            <strong>NOME COMPLETO</strong>
            <Input name="name" />
          </div>
          <div>
            <strong>CNPJ</strong>
            <Input name="cnpj" />
          </div>
          <div className="middleSize">
            <strong>RESPONSÁVEL TÉCNICO</strong>
            <Input name="technical_legal" />
          </div>
          <div>
            <strong>ENDEREÇO DE E-MAIL</strong>
            <Input name="email" />
          </div>
          <div>
            <strong>TELEFONE</strong>
            <Input name="phone" />
          </div>
          <div>
            <strong>TELEFONE 24H</strong>
            <Input name="phone_24h" />
          </div>
          <div className="fullSize">
            <strong>ENDEREÇO COMPLETO</strong>
            <Input name="address" />
          </div>
          <div>
            <strong>CEP</strong>
            <Input name="zipcode" />
          </div>
          <div className="middleSize">
            <strong>REGIÃO ADMINISTRATIVA</strong>
            <Input name="district" />
          </div>
          <div>
            <strong>SENHA INICIAL</strong>
            <Input name="password" />
          </div>
        </ClinicForm>
      </Content>
    </Container>
  );
}
