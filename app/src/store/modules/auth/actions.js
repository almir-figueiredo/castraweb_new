export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, operator) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, operator },
  };
}

export function signUpRequest(name, cpf, email, registration, type, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, cpf, email, registration, type, password },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
