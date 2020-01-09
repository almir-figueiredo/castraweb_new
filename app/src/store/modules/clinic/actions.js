export function clinicSignInRequest(email, password) {
  return {
    type: '@clinic/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function clinicSignInSuccess(token, operator) {
  return {
    type: '@clinic/SIGN_IN_SUCCESS',
    payload: { token, operator },
  };
}

export function clinicSignUpRequest(
  name,
  cpf,
  email,
  registration,
  type,
  password
) {
  return {
    type: '@clinic/SIGN_UP_REQUEST',
    payload: { name, cpf, email, registration, type, password },
  };
}

export function clinicSignFailure() {
  return {
    type: '@clinic/SIGN_FAILURE',
  };
}
export function clinicSignOut() {
  return {
    type: '@clinic/SIGN_OUT',
  };
}
