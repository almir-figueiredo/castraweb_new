import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';

import {
  clinicSignUpFailure,
  clinicUpdateSuccess,
  clinicUpdateFailure,
} from './actions';

/* export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'clinics/sessions', {
      email,
      password,
    });

    const { token, clinic } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(clinicSignInSuccess(token, clinic));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Conta inexistente, verifique seus dados');
    yield put(clinicSignFailure());
  }
} */

export function* clinicSignUp({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'clinics', data);

    history.push('/clinics');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');

    yield put(clinicSignUpFailure());
  }
}

export function* clinicUpdateRequest({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(api.put, `clinics/${id}`, data);

    toast.success('Cadastro atualizado');

    yield put(clinicUpdateSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(clinicUpdateFailure());
  }
}

/* export function signOut() {
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
} */

export default all([
  // takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@clinic/UPDATE_PROFILE_REQUEST', clinicUpdateRequest),
  takeLatest('@clinic/SIGN_UP_REQUEST', clinicSignUp),
  // takeLatest('@clinic/SIGN_OUT', signOut),
]);
