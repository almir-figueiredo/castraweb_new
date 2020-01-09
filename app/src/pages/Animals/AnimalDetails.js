/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Select, Input } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Content, AnimalForm } from './styles';

import DetailsMenu from '../../components/DetailsMenu';

export default function AnimalDetails() {
  const { id } = useParams();
  const [animal, setAnimal] = useState();

  useEffect(() => {
    async function loadAnimal() {
      const { data } = await api.get(`animals/${id}`);
      setAnimal(data);
    }
    if (id) {
      loadAnimal();
    }
  }, [id]);

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
    if (id) {
      await api.put(`animals/${id}`, data);
      return history.goBack();
    }

    await api.post('animals/', data);
    history.goBack();
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
      <DetailsMenu name="Animal" form="animalForm" edit={!!id} />

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
