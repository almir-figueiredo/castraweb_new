import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'operators/sessions', {
      email,
      password,
    });

    const { token, operator } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, operator));

    history.push('/clinics');
  } catch (err) {
    toast.error('Conta inexistente, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, cpf, email, registration, type, password } = payload;

    yield call(api.post, 'operators', {
      name,
      cpf,
      email,
      registration,
      type,
      password,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');

    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
