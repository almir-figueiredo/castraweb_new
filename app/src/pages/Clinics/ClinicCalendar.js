import React, { createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptLocale from '@fullcalendar/core/locales/pt-br';

import { useParams } from 'react-router-dom';
import { eventsListRequest } from '../../store/modules/schedule/actions';

import history from '../../services/history';

import './main.scss';

export default function Calendar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const calendarComponentRef = createRef();
  const { limits, schedules, dates } = useSelector(state => state.schedule);
  const limit = [3, 7, 10, 15, 15];
  const titles = ['Cadela (G)', 'Cadela (P)', 'Cachorro', 'Gato', 'Gata'];

  const compareData = limits.map(d => {
    const eachSpecie = d.map(s => {
      const realData = schedules.flatMap(r => {
        const paired = [];
        if (s[0] === r[0] && s[2] === r[1] && r[2] === Number(id))
          paired.push(1);
        else paired.push(0);
        return paired;
      });
      const reducer = (ac, c) => ac + c;
      const sum = realData.reduce(reducer, 0);
      return sum;
    });
    return eachSpecie;
  });

  const events = dates.flatMap(day => {
    const response = titles.map(t => {
      const eventid = titles.indexOf(t);
      const title = `${t}: ${limit[titles.indexOf(t)] -
        compareData[[dates.indexOf(day)]][titles.indexOf(t)]}`;
      const start = day;
      const backgroundColor = `${
        compareData[[dates.indexOf(day)]][titles.indexOf(t)] /
          limit[titles.indexOf(t)] ===
        1
          ? 'red'
          : '#dcdcdc'
      }`;
      const textColor = `${
        compareData[[dates.indexOf(day)]][titles.indexOf(t)] /
          limit[titles.indexOf(t)] ===
        1
          ? 'white'
          : 'black'
      }`;
      const borderColor = `${
        compareData[[dates.indexOf(day)]][titles.indexOf(t)] /
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

  /* setInterval(function() {
    dispatch(eventsListRequest());
  }, 30000); */

  function handleDateClick(arg) {
    history.push(`/clinics/schedules/${id}/${arg.date}`);
  }

  return (
    <div className="demo-app">
      <div className="demo-app-calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          weekends={false}
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
