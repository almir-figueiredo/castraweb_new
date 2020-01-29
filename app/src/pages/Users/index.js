import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';

import api from '../../services/api';
import history from '../../services/history';
import { animalsListRequest } from '../../store/modules/animal/actions';
import ImportCSV from '../../components/ImportCSV';

import { Container, Menu, MenuBar, SearchBar, Content, Table } from './styles';

export default function Users() {
  const animals = useSelector(state => state.animal.allAnimals);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const appointments = useSelector(state => state.schedule.data);
  const dispatch = useDispatch();

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

  async function handleSubmit(id) {
    dispatch(animalsListRequest(id));
    history.goBack();
  }

  return (
    <Container>
      <Container>
        <ImportCSV />
        <Menu>
          <strong> Usuários </strong>
          <MenuBar>
            <button type="button" onClick={() => history.push('/users/new')}>
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
              <th>
                <table>
                  <thead>
                    <tr>
                      <th>ANIMAIS CADASTRADOS</th>
                    </tr>
                    <tr>
                      <th>Termo de Autorização</th>
                      <th>Nome do Animal</th>
                      <th>Data da Cirurgia</th>
                      <th>Situação da Cirurgia</th>
                    </tr>
                  </thead>
                </table>
              </th>
            </tr>
            <tr />
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.cpf}</td>
                <td>
                  <table className="subtable">
                    <tbody>
                      {animals
                        .filter(f => f.user_id === user.id)
                        .map(animal => (
                          <tr key={animal.id}>
                            <td>{animal.auth_number}</td>
                            <td>{animal.name}</td>
                            {appointments
                              .filter(f => f.Animal.id === animal.id)
                              .map(appointment => (
                                <>
                                  <td>
                                    {format(
                                      parseISO(appointment.date),
                                      'dd/MMMM/yyyy'
                                    )}
                                  </td>
                                  <td>{appointment.situation}</td>
                                </>
                              ))}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleSubmit(user.id)}
                  >
                    cadastrar animais
                  </button>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => history.push(`/users/edit/${user.id}`)}
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
