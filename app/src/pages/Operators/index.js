import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Menu, MenuBar, SearchBar, Content, Table } from './styles';

export default function Operators() {
  const [operators, setOperators] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getOperators() {
      const { data } = await api.get('operators');

      setOperators(data);
    }
    getOperators();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este operador?') === true) {
      await api.delete(`operators/${id}`);

      setOperators(operators.filter(operator => operator.id !== id));
    }
  }

  function handleSearch(input) {
    setSearch(input);
  }

  async function handleKeyPress(key) {
    if (key === 'Enter') {
      const { data } = await api.get('operators', {
        params: {
          name: search,
        },
      });
      setOperators(data);
    }
  }

  return (
    <Container>
      <Container>
        <Menu>
          <strong>Operadores cadastrados</strong>
          <MenuBar>
            <button
              type="button"
              onClick={() => history.push('/operators/details')}
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
            {operators.map(operator => (
              <tr key={operator.id}>
                <td>{operator.name}</td>
                <td>{operator.registration}</td>
                <td>{operator.type}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() =>
                      history.push(`/operators/details/${operator.id}`)
                    }
                  >
                    editar
                  </button>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => handleDelete(operator.id)}
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
