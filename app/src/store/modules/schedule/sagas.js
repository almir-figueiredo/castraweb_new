import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
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

import history from '../../../services/history';
import api from '../../../services/api';

import { eventsListSuccess, eventsListFailure } from './actions';

export function* eventsList() {
  try {
    const range = yield eachDayOfInterval({
      start: subMonths(new Date(), 1),
      end: addMonths(new Date(), 1),
    });
    const holidays = yield api.get('holidays');

    const hDays = yield holidays.data.map(e => {
      const [day, month, year] = e.date.split('/');
      const newDate = new Date(year, month - 1, day);
      const newDateISO = newDate.toISOString();
      return newDateISO;
    });

    const rangeFormated = yield range.map(day => {
      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(day, 0), 0), 0),
        0
      );
      const checkDateString = checkDate.toISOString();
      return checkDateString;
    });
    const { data } = yield api.get('schedules');
    console.log(data);
    const dates = yield rangeFormated.filter(f => !hDays.includes(f));

    const limit = [3, 7, 10, 15, 15];
    const titles = ['Cadela (G)', 'Cadela (P)', 'Cachorro', 'Gato', 'Gata'];
    const limits = yield dates.map(day => {
      const animals = titles.map(a => {
        const check = [a, limit[titles.indexOf(a)], day];
        return check;
      });
      return animals;
    });
    const timezone = yield Intl.DateTimeFormat().resolvedOptions().timeZone;

    const schedules = yield data.map(day => {
      const checkDate = setMilliseconds(
        setSeconds(setMinutes(setHours(parseISO(day.date), 0), 0), 0),
        0
      );
      const compareDate = utcToZonedTime(checkDate, timezone);
      const resp = [];
      if (
        day.Animal.specie === 'canina' &&
        day.Animal.gender === 'F' &&
        day.Animal.size === 'G'
      )
        resp.push('Cadela (G)', compareDate.toISOString(), day.clinic_id);
      if (
        day.Animal.specie === 'canina' &&
        day.Animal.gender === 'F' &&
        day.Animal.size === 'P'
      )
        resp.push('Cadela (P)', compareDate.toISOString(), day.clinic_id);
      if (day.Animal.specie === 'canina' && day.Animal.gender === 'M')
        resp.push('Cachorro', compareDate.toISOString(), day.clinic_id);
      if (day.Animal.specie === 'felina' && day.Animal.gender === 'F')
        resp.push('Gata', compareDate.toISOString(), day.clinic_id);
      if (day.Animal.specie === 'felina' && day.Animal.gender === 'M')
        resp.push('Gato', compareDate.toISOString(), day.clinic_id);
      return resp;
    });
    console.log(schedules);
    yield put(eventsListSuccess(data, limits, schedules, dates));
    // history.push(`/clinics`);
  } catch (err) {
    console.error(err);
    toast.error('AGENDA INDISPONÍVEL! ACIONE O ADMINISTRADOR DO SITE');
    yield put(eventsListFailure());
    history.push(`/clinics`);
  }
}

export default all([takeLatest('@schedule/EVENTS_LIST_REQUEST', eventsList)]);
