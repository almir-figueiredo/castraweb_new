import { all, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import {
  animalsListSuccess,
  animalsListFailure,
  allAnimalsSuccess,
} from './actions';

export function* animalsList({ payload }) {
  try {
    const { id } = payload;
    const { data } = yield api.get(`users/${id}/animals`, {
      params: { id },
    });
    const animalsFormated = data.map(animal => {
      const resp = [];
      if (
        animal.specie === 'canina' &&
        animal.gender === 'F' &&
        animal.size === 'G'
      )
        resp.push('Cadela (G)');
      if (
        animal.specie === 'canina' &&
        animal.gender === 'F' &&
        animal.size === 'P'
      )
        resp.push('Cadela (P)');
      if (animal.specie === 'canina' && animal.gender === 'M')
        resp.push('Cachorro');
      if (animal.specie === 'felina' && animal.gender === 'F')
        resp.push('Gata');
      if (animal.specie === 'felina' && animal.gender === 'M')
        resp.push('Gato');
      return resp;
    });

    const titles = ['Cadela (G)', 'Cadela (P)', 'Cachorro', 'Gato', 'Gata'];
    const animals = titles.map(d => {
      const realData = animalsFormated.flatMap(a => {
        const n = [];
        if (d === a[0]) n.push(1);
        else n.push(0);
        return n;
      });
      const reducer = (ac, c) => ac + c;
      const sum = realData.reduce(reducer, 0);
      const join = [d, sum];
      return join;
    });

    yield put(animalsListSuccess(animals, data));
    history.push(`/users/${id}/animals`);
  } catch (err) {
    toast.error(
      'LISTA DE ANIMAIS NÃO ENCONTRADA! ACIONE O ADMINISTRADOR DO SITE'
    );
    yield put(animalsListFailure());
    const { id } = payload;
    history.push(`/users/${id}/animals`);
  }
}

export function* allAnimalsList() {
  try {
    const { data } = yield api.get(`/animals`);
    const allAnimals = data;

    yield put(allAnimalsSuccess(allAnimals));
  } catch (err) {
    console.log(err);
    toast.error('NÃO FOI POSSÍVEL GERAR A LISTA DOS ANIMAIS!');
    yield put(animalsListFailure());
  }
}

export default all([
  takeLatest('@animal/ANIMALS_LIST_REQUEST', animalsList),
  takeLatest('@animal/ALL_ANIMALS_REQUEST', allAnimalsList),
]);
