/* eslint-disable eqeqeq */
import React from 'react';
import { Form, Choice } from '@rocketseat/unform';

import {
  isBefore,
  startOfTomorrow,
  parseISO,
  isWeekend,
  format,
} from 'date-fns';
import { useSelector } from 'react-redux';
import api from '../../services/api';

import './styles.css';

export default function Appointments() {
  const { schedules, limits, dates } = useSelector(state => state.schedule);
  const animals = useSelector(state => state.animal);

  const idsList = schedules.flatMap(e => {
    const ids = e[2];
    return ids;
  });
  const ids = idsList.filter((v, i, a) => a.indexOf(v) === i);

  const schedulesById = ids.map(id => {
    const filter = schedules.filter(e => e[2] == id);
    return filter;
  });
  const titles = ['Cadela (G)', 'Cadela (P)', 'Cachorro', 'Gato', 'Gata'];

  const compareById = schedulesById.map(scId => {
    const compare = dates.map(d => {
      const filter = scId.filter(e => e[1] == d);
      return filter;
    });
    return compare;
  });

  const animalById = compareById.map(cId => {
    const animal = cId.flatMap(d => {
      const realData = titles.map(a => {
        const n = [];
        if (d === []) n.push(a, 0, dates[cId.indexOf(d)]);
        else {
          const b = d.filter(f => f[0] === a);
          const b_length = b.length;
          n.push(a, b_length, dates[cId.indexOf(d)]);
        }
        return n;
      });
      return realData;
    });
    return animal;
  });

  const scheduledById = animalById.map(aId => {
    const scheduled = dates.map(a => {
      const n = aId.filter(f => f[2] == a);
      return n;
    });
    return scheduled;
  });

  const vacanciesById = scheduledById.map(scId => {
    const vacancies = scId.map(sc => {
      const schDay = sc.map(scd => {
        const match = [
          scd[0],
          limits[scId.indexOf(sc)][sc.indexOf(scd)][1] - scd[1],
          scd[2],
        ];
        return match;
      });
      return schDay;
    });
    return vacancies;
  });

  const daysAvailableById = vacanciesById.map(vcId => {
    const daysAvailable = vcId.flatMap(c => {
      const count = [];
      if (
        animals.animals[[0]][0] === c[[0]][0] &&
        animals.animals[[0]][1] <= Number(c[[0]][1]) &&
        animals.animals[[1]][0] === c[[1]][0] &&
        animals.animals[[1]][1] <= Number(c[[1]][1]) &&
        animals.animals[[2]][0] === c[[2]][0] &&
        animals.animals[[2]][1] <= Number(c[[2]][1]) &&
        animals.animals[[3]][0] === c[[3]][0] &&
        animals.animals[[3]][1] <= Number(c[[3]][1]) &&
        animals.animals[[4]][0] === c[[4]][0] &&
        animals.animals[[4]][1] <= Number(c[[4]][1])
      )
        count.push(1);
      else count.push(0);
      return count;
    });
    return daysAvailable;
  });

  const avaiabilityById = daysAvailableById.map(daId => {
    const avaiability = dates.flatMap(d => {
      const day = [];
      if (
        isBefore(parseISO(d), startOfTomorrow()) ||
        daId[dates.indexOf(d)] === 0 ||
        isWeekend(parseISO(d))
      )
        day.push(0);
      else day.push(1);
      return day;
    });
    return avaiability;
  });

  const nextDayAvaiableById = avaiabilityById.map(avId => {
    const nextDayAvaiable = {
      date: dates[avId.indexOf(1)],
      formatedDate: format(parseISO(dates[avId.indexOf(1)]), 'dd/MM/yyyy'),
      clinic_id: ids[avaiabilityById.indexOf(avId)],
    };
    return nextDayAvaiable;
  });

  const days = nextDayAvaiableById.map(day => {
    const op = {
      value: [day.date, day.clinic_id],
      label: `Dia: ${day.formatedDate}\nLocal: Clínica nº ${day.clinic_id}`,
    };
    return op;
  });

  console.log(parseISO('2020-01-22T03:00:00.000Z'));

  console.log(animals.data);

  async function handleSubmit(data) {
    animals.data.map(async e => {
      const dSplit = data.Dia[0].split(',');
      console.log(parseISO(dSplit[0]));
      const user_Id = e.User.id;
      const { id } = e;
      await api.post(`users/${user_Id}/animals/${id}/appointment`, {
        params: {
          date: parseISO(dSplit[0]),
          clinic_id: Number(dSplit[1]),
        },
      });
    });
  }

  return (
    <>
      <a href="#openModal">Open Modal</a>
      <div id="openModal" className="modalDialog">
        <div>
          <a href="#close" title="Close" className="close">
            X
          </a>
          <div>
            <Form onSubmit={handleSubmit}>
              <Choice name="Dia" options={days} multiple />

              <button type="submit">Send</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
