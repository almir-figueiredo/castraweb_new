/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Select, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, OperatorForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function OperatorDetails() {
  const { id } = useParams();
  const [operator, setOperator] = useState();

  useEffect(() => {
    async function loadOperator() {
      const { data } = await api.get(`operators/${id}`);
      setOperator(data);
    }
    if (id) {
      loadOperator();
    }
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    cpf: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    registration: Yup.string()
      .truncate()
      .required(),
    type: Yup.string()
      .truncate()
      .required(),
    password: Yup.string().min(6),
  });

  async function handleSubmit(data) {
    if (id) {
      await api.put(`operators/${id}`, data);
      return history.goBack();
    }

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
      <DetailsMenu name="Operador" form="operatorForm" edit={!id} />

      <Content>
        <OperatorForm
          schema={schema}
          id="operatorForm"
          onSubmit={handleSubmit}
          initialData={operator}
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
          {id ? (
            <div>
              <strong>SENHA INICIAL</strong>
              <Input name="password" />
            </div>
          ) : null}
        </OperatorForm>
      </Content>
    </Container>
  );
}
