import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import history from '../../services/history';

import MenuBar from '../../components/MenuBar';

import { ContainerAnimals, Content, TableAnimals } from './styles';

export default function UserAnimals() {
  const { id } = useParams();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    async function loadAnimals() {
      const { data } = await api.get(`users/animals/${id}`);
      setAnimals(data);
    }
    if (id) {
      loadAnimals();
    }
  }, [id]);

  async function handleDelete(choosedId) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este animal?') === true) {
      await api.delete(`animals/${choosedId}`);

      setAnimals(animals.filter(animal => animal.id === choosedId));
    }
  }

  return (
    <>
      <ContainerAnimals>
        <MenuBar
          title="ANIMAIS CADASTRADOS PARA O USUÁRIO"
          route="animals"
          withId
          id={id}
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
              {animals.map(animal => (
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
                        history.push(`/animals/details/${animal.id}`)
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
      </ContainerAnimals>
    </>
  );
}
