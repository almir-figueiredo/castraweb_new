/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import React, { createRef, useState, useEffect } from 'react';
import {
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  eachDayOfInterval,
  subMonths,
  addMonths,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt-br';

import { useParams } from 'react-router-dom';

import api from '../../services/api';
import history from '../../services/history';

import './main.scss';

export default function Calendar() {
  const { id } = useParams();
  const calendarComponentRef = createRef();
  const [schedules, setSchedules] = useState([]);
  const [allSchedules, setAllSchedules] = useState([]);
  const range = eachDayOfInterval({
    start: subMonths(new Date(), 1),
    end: addMonths(new Date(), 1),
  });
  const rangeFormated = range.map(day => {
    const checkDate = setMilliseconds(
      setSeconds(setMinutes(setHours(day, 0), 0), 0),
      0
    );
    const checkDateString = checkDate.toISOString();
    return checkDateString;
  });
  const titles = ['Cadela (G)', 'Cadela (P)', 'Cachorro', 'Gato', 'Gata'];
  const animalsAndDates = rangeFormated.map(day => {
    const animals = titles.map(a => {
      const check = [a, day];
      return check;
    });
    return animals;
  });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    async function loadSchedule() {
      const { data } = await api.get(`schedules/${id}`, {
        params: { id },
      });
      setSchedules(data);
    }
    if (id) {
      loadSchedule();
    }
  }, [id]);

  useEffect(() => {
    async function listSchedules() {
      const filteredData = schedules.map(e => {
        const { specie } = e.Animal;
        const { gender } = e.Animal;
        const { size } = e.Animal;
        const { date } = e;
        return [specie, gender, size, date];
      });

      const SchedulesFormated = filteredData.map(day => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(parseISO(day[3]), 0), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);
        const response = [];
        if (day[0] === 'canina' && day[1] === 'F' && day[2] === 'G')
          response.push('Cadela (G)', compareDate.toISOString());
        if (day[0] === 'canina' && day[1] === 'F' && day[2] === 'P')
          response.push('Cadela (P)', compareDate.toISOString());
        if (day[0] === 'canina' && day[1] === 'M')
          response.push('Cachorro', compareDate.toISOString());
        if (day[0] === 'felina' && day[1] === 'F')
          response.push('Gata', compareDate.toISOString());
        if (day[0] === 'felina' && day[1] === 'M')
          response.push('Gato', compareDate.toISOString());
        return response;
      });

      setAllSchedules(SchedulesFormated);
    }
    if (id) {
      listSchedules();
    }
  }, [id, schedules, timezone]);

  const finalSchedules = animalsAndDates.map(d => {
    const check = d.map(a => {
      const count = allSchedules.flatMap(s => {
        const paired = [];
        if (s[0] === a[0] && s[1] === a[1]) paired.push(1);
        else paired.push(0);
        return paired;
      });
      const reducer = (ac, c) => ac + c;
      const sum = count.reduce(reducer, 0);
      return sum;
    });
    return check;
  });

  function handleDateClick(arg) {
    history.push(`/clinics/schedules/${id}/${arg.date}`);
  }

  const limit = [3, 7, 10, 15, 15];
  // depois esse limite deve ser criado e alterado pela clínica
  // a regra do limite de permitir exceções
  // assim, em um determinado dia a clínica pode permitir
  // mais ou menos animais.

  const events = rangeFormated.flatMap(day => {
    const response = titles.map(t => {
      const eventid = titles.indexOf(t);
      const title = `${t}: ${limit[titles.indexOf(t)] -
        finalSchedules[[rangeFormated.indexOf(day)]][titles.indexOf(t)]}`;
      const start = day;
      const backgroundColor = `${
        finalSchedules[[rangeFormated.indexOf(day)]][titles.indexOf(t)] /
          limit[titles.indexOf(t)] ===
        1
          ? 'red'
          : '#dcdcdc'
      }`;
      const textColor = `${
        finalSchedules[[rangeFormated.indexOf(day)]][titles.indexOf(t)] /
          limit[titles.indexOf(t)] ===
        1
          ? 'white'
          : 'black'
      }`;
      const borderColor = `${
        finalSchedules[[rangeFormated.indexOf(day)]][titles.indexOf(t)] /
          limit[titles.indexOf(t)] ===
        1
          ? 'red'
          : '#dcdcdc'
      }`;

      return {
        id: eventid,
        title,
        start,
        textColor,
        borderColor,
        backgroundColor,
      };
    });
    return response;
  });

  return (
    <div className="demo-app">
      <div className="demo-app-calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          locale={ptLocale}
          plugins={[dayGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          dateClick={handleDateClick}
          showNonCurrentDates={false}
          events={events}
        />
      </div>
    </div>
  );
}
