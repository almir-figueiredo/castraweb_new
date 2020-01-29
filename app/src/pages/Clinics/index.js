import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import api from '../../services/api';
import history from '../../services/history';
import { Container, Menu, MenuBar, Content, Table } from './styles';

export default function Clinics() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    async function getClinics() {
      const { data } = await api.get('clinics');

      setClinics(data);
    }
    getClinics();
  }, []);

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar esta clínica?') === true) {
      await api.delete(`clinics/${id}`);

      setClinics(clinics.filter(clinic => clinic.id !== id));
    }
  }

  return (
    <Container>
      <Container>
        <Menu>
          <strong>Clínicas cadastradas</strong>
          <MenuBar>
            <button type="button" onClick={() => history.push('/clinics/new')}>
              <MdAdd size={24} />
              CADASTRAR
            </button>
          </MenuBar>
        </Menu>
      </Container>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>RESPONSÁVEL TÉCNICO</th>
              <th>TELEFONE</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map(clinic => (
              <tr key={clinic.id}>
                <td>{clinic.name}</td>
                <td>{clinic.technical_legal}</td>
                <td>{clinic.phone}</td>
                <td>
                  <button
                    className="schedule"
                    type="button"
                    onClick={() =>
                      history.push(`/clinics/calendar/${clinic.id}`)
                    }
                  >
                    Ver Agenda
                  </button>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => history.push(`/clinics/edit/${clinic.id}`)}
                  >
                    editar
                  </button>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => handleDelete(clinic.id)}
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
