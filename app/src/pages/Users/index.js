import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { Container, Menu, MenuBar, SearchBar, Content, Table } from './styles';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getUsers() {
      const { data } = await api.get('users');

      setUsers(data);
    }
    getUsers();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este usuário?') === true) {
      await api.delete(`users/${id}`);

      setUsers(users.filter(user => user.id !== id));
    }
  }

  function handleSearch(input) {
    if (input === '') {
      setVisible(false);
    }
    setSearch(input);
  }

  async function handleKeyPress(key) {
    if (key === 'Enter') {
      if (search === '') {
        setVisible(false);
      }
      const { data } = await api.get('users', {
        params: {
          name: search,
        },
      });
      if (data.length > 0) {
        setVisible(true);
      }
      setUsers(data);
    }
  }

  return (
    <Container>
      <Container>
        <Menu>
          <strong> Usuários </strong>
          <MenuBar>
            <button
              type="button"
              onClick={() => history.push('/users/details')}
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
                placeholder="Buscar usuário"
              />
            </div>
          </SearchBar>
        </Menu>
      </Container>

      <Content>
        <Table visible={visible}>
          <thead>
            <tr>
              <th>NOME</th>
              <th>CPF</th>
              <th>DATA DE NASCIMENTO</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.cpf}</td>
                <td>{user.birthday}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => history.push(`/animals/${user.id}`)}
                  >
                    cadastrar animais
                  </button>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => history.push(`/users/details/${user.id}`)}
                  >
                    editar
                  </button>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => handleDelete(user.id)}
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
