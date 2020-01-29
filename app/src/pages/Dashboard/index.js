import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdChevronLeft, MdChevronRight, MdDateRange } from 'react-icons/md';
import api from '../../services/api';
import { Container, Time } from './styles';

export default function ClinicDashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule(data) {
      const response = await api.call(api.get, `clinics/${data.id}/schedules`, {
        date,
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const days = response.map(day => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(day, 0), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          date: `${day}`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(days);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleInputVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
        <button type="button" onClick={handleInputVisible}>
          <MdDateRange size={36} color="#FFF" />
        </button>
        <DatePicker
          onChange={d => setDate(d)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Escolha outra data"
          withPortal
          visible={visible}
        />
      </header>
      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
