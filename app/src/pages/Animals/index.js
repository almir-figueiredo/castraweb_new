import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Menu, MenuBar, SearchBar, Content, Table } from './styles';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getAnimals() {
      const { data } = await api.get('animals');

      setAnimals(data);
    }
    getAnimals();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este operador?') === true) {
      await api.delete(`animals/${id}`);

      setAnimals(animals.filter(animal => animal.id !== id));
    }
  }

  function handleSearch(input) {
    setSearch(input);
  }

  async function handleKeyPress(key) {
    if (key === 'Enter') {
      const { data } = await api.get('animals', {
        params: {
          name: search,
        },
      });
      setAnimals(data);
    }
  }

  return (
    <Container>
      <Container>
        <Menu>
          <strong>Animais cadastrados</strong>
          <MenuBar>
            <button
              type="button"
              onClick={() => history.push('/animals/details')}
            >
              <MdAdd size={24} />
              CADASTRAR
            </button>
          </MenuBar>
          <SearchBar>
            <div>
              <MdSearch size={24} />
              <input
                type="text"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                onKeyPress={e => handleKeyPress(e.key)}
                placeholder="Buscar operador"
              />
            </div>
          </SearchBar>
        </Menu>
      </Container>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>MATRÍCULA</th>
              <th>PERFIL</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.registration}</td>
                <td>{animal.type}</td>
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
        </Table>
      </Content>
    </Container>
  );
}
