/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import api from '../../services/api';
import history from '../../services/history';

import MenuBar from '../../components/MenuBar';
import FormModal from '../../components/ModalForm';
import formTitles from '../../FormsModels/Animals/formTitles';
import { animalsListRequest } from '../../store/modules/animal/actions';

import { ContainerAnimals, BottomBar, Content, TableAnimals } from './styles';

export default function UserAnimals() {
  const user = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.animal);
  const [visible, setVisible] = useState(true);
  const schema = Yup.object().shape({
    auth_number: Yup.string(),
    name: Yup.string(),
    specie: Yup.string(),
    gender: Yup.string(),
    race: Yup.string(),
    size: Yup.string(),
    age: Yup.string(),
  });

  useEffect(() => {
    if (data.length === 3) setVisible(false);
  }, [data.length]);

  async function handleDelete(choosedId) {
    if (window.confirm('Deseja deletar este animal?') === true) {
      await api.delete(`animals/${choosedId}`);
      dispatch(animalsListRequest(user.id));
      setVisible(true);
    }
  }

  async function handleAppointment() {
    history.push(`/users/${user.id}/animals/appointment`);
  }

  return (
    <>
      <ContainerAnimals>
        <MenuBar
          title="ANIMAIS CADASTRADOS PARA O USUÁRIO"
          route={`users/${user.id}/animals`}
          visible={visible}
        />

        <Content>
          <TableAnimals>
            <thead>
              <tr>
                <th>NOME DO ANIMAL</th>
                <th>ESPÉCIE</th>
                <th>GÊNERO</th>
                <th>RAÇA</th>
                <th>PORTE</th>
              </tr>
            </thead>
            <tbody>
              {data.map(animal => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.specie}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.race}</td>
                  <td>{animal.size}</td>
                  <td>
                    <button
                      className="edit"
                      type="button"
                      onClick={() =>
                        history.push(
                          `/users/${user.id}/animals/edit/${animal.id}`
                        )
                      }
                    >
                      editar
                    </button>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handleDelete(animal.id)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableAnimals>
        </Content>
        <BottomBar>
          <p>
            Você tem {data.length} {data.length === 1 ? 'animal' : 'animais'}{' '}
            cadastrados para o Termo de Encaminhamento nº 850.{' '}
            {data.length === 3
              ? 'Para agendar as cirurgias clique no botão AGENDAR.'
              : 'Caso queira cadastrar mais, clique no botão CADASTRAR.'}
            <br />
            {data.length < 3
              ? `Caso deseje finalizar o cadastro e agendar a
            ${data.length === 1 ? ' ' : 's '}
            cirurgia${data.length === 1 ? ' ' : 's '}clique no botão AGENDAR.`
              : ''}
          </p>
          <FormModal
            target="agendar"
            backTarget="início"
            buttonTitle="AGENDAR"
            name="Animais"
            schema={schema}
            onSubmit={handleAppointment}
            formTitles={formTitles.formTitles}
          />
        </BottomBar>
      </ContainerAnimals>
    </>
  );
}
