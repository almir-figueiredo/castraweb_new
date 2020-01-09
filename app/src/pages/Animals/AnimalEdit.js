/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Select, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, AnimalForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function AnimalEdit() {
  const { userId, id } = useParams();
  const [animal, setAnimal] = useState();

  useEffect(() => {
    async function loadAnimal() {
      const { data } = await api.get(`users/${userId}/animals/${id}`);
      setAnimal(data);
    }
    loadAnimal();
  }, [id, userId]);

  const schema = Yup.object().shape({
    auth_number: Yup.string().required(),
    name: Yup.string().required(),
    specie: Yup.string().required(),
    gender: Yup.string().required(),
    race: Yup.string().required(),
    size: Yup.string().required(),
    age: Yup.string().required(),
  });

  async function handleSubmit(data) {
    await api.put(`users/${userId}/animals/${id}`, data);
    return history.goBack();
  }

  const sp = [
    { id: 'canina', title: 'CANINA' },
    { id: 'felina', title: 'FELINA' },
  ];
  const gend = [
    { id: 'M', title: 'MACHO' },
    { id: 'F', title: 'FÊMEA' },
  ];
  const sz = [
    { id: 'P', title: 'Menor que 20kg' },
    { id: 'G', title: 'Maior que 20kg' },
  ];

  return (
    <Container>
      <DetailsMenu name="Animal" form="animalForm" edit />

      <Content>
        <AnimalForm
          schema={schema}
          id="animalForm"
          onSubmit={handleSubmit}
          initialData={animal}
        >
          <div>
            <strong>TERMO DE ENCAMINHAMENTO</strong>
            <Input name="auth_number" />
          </div>
          <div>
            <strong>NOME DO ANIMAL</strong>
            <Input name="name" />
          </div>
          <div>
            <strong>ESPÉCIE</strong>
            <Select name="specie" options={sp} />
          </div>
          <div>
            <strong>SEXO DO ANIMAL</strong>
            <Select name="gender" options={gend} />
          </div>
          <div>
            <strong>PORTE DO ANIMAL</strong>
            <Select name="size" options={sz} />
          </div>
          <div>
            <strong>IDADE</strong>
            <Input name="age" />
          </div>
        </AnimalForm>
      </Content>
    </Container>
  );
}
