/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Input, Select } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, ClinicForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function ClinicEdit() {
  const { id } = useParams();
  const [clinic, setClinic] = useState();

  useEffect(() => {
    async function loadClinic() {
      const { data } = await api.get(`clinics/${id}`);
      setClinic(data);
    }
    loadClinic();
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string(),
    cnpj: Yup.string(),
    technical_legal: Yup.string(),
    email: Yup.string().email(),
    phone: Yup.string(),
    phone_24h: Yup.string(),
    address: Yup.string(),
    zipcode: Yup.string(),
    district: Yup.string(),
  });

  async function handleSubmit(data) {
    await api.put(`clinics/${id}`, data);
    return history.goBack();
  }

  const formTitles = [
    {
      id: 1,
      title: 'NOME COMPLETO',
      className: 'fullSize',
      name: 'name',
      type: 'Input',
      options: null,
    },
    {
      id: 2,
      title: 'CNPJ',
      className: null,
      name: 'cnpj',
      type: 'Input',
      options: null,
    },
    {
      id: 3,
      title: 'RESPONSÁVEL TÉCNICO',
      className: 'middleSize',
      name: 'technical_legal',
      type: 'Input',
      options: null,
    },
    {
      id: 4,
      title: 'ENDEREÇO DE E-MAIL',
      className: null,
      name: 'email',
      type: 'Input',
      options: null,
    },
    {
      id: 5,
      title: 'TELEFONE',
      className: null,
      name: 'phone',
      type: 'Input',
      options: null,
    },
    {
      id: 6,
      title: 'TELEFONE 24H',
      className: null,
      name: 'phone_24h',
      type: 'Input',
      options: null,
    },
    {
      id: 7,
      title: 'ENDEREÇO COMPLETO',
      className: 'fullsize',
      name: 'address',
      type: 'Input',
      options: null,
    },
    {
      id: 8,
      title: 'CEP',
      className: null,
      name: 'zipcode',
      type: 'Input',
      options: null,
    },
    {
      id: 9,
      title: 'REGIÃO ADMINISTRATIVA',
      className: null,
      name: 'district',
      type: 'Input',
      options: null,
    },
  ];

  return (
    <Container>
      <DetailsMenu name="Clinica" form="ClinicForm" edit />

      <Content>
        <ClinicForm
          schema={schema}
          id="ClinicForm"
          onSubmit={handleSubmit}
          initialData={clinic}
        >
          {formTitles.map(item => (
            <div className={item.className} key={item.id}>
              <strong>{item.title}</strong>
              {item.type === 'Input' ? (
                <Input name={item.name} />
              ) : (
                <Select name={item.name} options={item.options} />
              )}
            </div>
          ))}
        </ClinicForm>
      </Content>
    </Container>
  );
}
