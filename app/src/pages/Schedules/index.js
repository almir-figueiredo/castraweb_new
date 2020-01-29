/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { subDays, addDays } from 'date-fns';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import DatePicker from '../../components/DatePicker';

import api from '../../services/api';
// import history from '../../services/history';
import MenuBar from '../../components/MenuBar';
import colors from '../../styles/colors';

import { ContainerSchedules, Content, TableSchedules } from './styles';

export default function ClinicSchedules() {
  const dateDefault = useParams();
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState(new Date(dateDefault.date));
  // const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    async function loadSchedule() {
      // const formatedDate = format(date, 'yyyy-MM-dd hh24:mi:ss')
      const { data } = await api.get('schedules', {
        params: { date },
      });
      setSchedules(data.filter(f => f.clinic_id == dateDefault.id));
    }
    if (date) {
      loadSchedule();
    }
  }, [date, dateDefault.id]);
  console.log(schedules);
  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm('Deseja deletar este agendamento?') === true) {
      await api.delete(`schedules/${id}`);

      setSchedules(schedules.filter(schedule => schedule.id === id));
    }
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <>
      <ContainerSchedules>
        <header>
          <button type="button" onClick={handlePrevDay}>
            <MdChevronLeft size={36} color={colors.primary} />
          </button>
          <DatePicker name="date" setChange={setDate} getChange={date} />

          <button type="button" onClick={handleNextDay}>
            <MdChevronRight size={36} color={colors.primary} />
          </button>
        </header>
      </ContainerSchedules>
      <ContainerSchedules>
        <MenuBar title="AGENDA DE CIRURGIAS" route="schedules" />

        <Content>
          <TableSchedules>
            <thead>
              <tr>
                <th>NOME DO TUTOR</th>
                <th>CPF</th>
                <th>NOME DO ANIMAL</th>
                <th>ESPÉCIE</th>
                <th>GÊNERO</th>
                <th>RAÇA</th>
                <th>PORTE</th>
                <th>STATUS DA CIRURGIA</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(schedule => (
                <tr key={schedule.id}>
                  <td>{schedule.User.name}</td>
                  <td>{schedule.User.cpf}</td>
                  <td>{schedule.Animal.name}</td>
                  <td>{schedule.Animal.specie}</td>
                  <td>{schedule.Animal.gender}</td>
                  <td>{schedule.Animal.race}</td>
                  <td>{schedule.Animal.size}</td>
                  <td>{schedule.situation}</td>
                  <td>
                    {/* <button
                  className="edit"
                  type="button"
                  onClick={() =>
                    history.push(`/schedules/details/${schedule.id}`)
                  }
                >
                  editar
                </button> */}
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableSchedules>
        </Content>
      </ContainerSchedules>
    </>
  );
}
