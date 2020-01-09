export function clinicSignInRequest(email, password) {
  return {
    type: '@clinic/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function clinicSignInSuccess(token) {
  return {
    type: '@clinic/SIGN_IN_SUCCESS',
    payload: { token },
  };
}

export function clinicSignUpRequest(data) {
  return {
    type: '@clinic/SIGN_UP_REQUEST',
    payload: { data },
  };
}
export function clinicUpdateRequest(id) {
  return {
    type: '@clinic/UPDATE_PROFILE_REQUEST',
    payload: { id },
  };
}
export function clinicUpdateSuccess(profile) {
  return {
    type: '@clinic/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}
export function clinicUpdateFailure() {
  return {
    type: '@clinic/UPDATE_PROFILE_FAILURE',
  };
}
export function clinicSignUpFailure() {
  return {
    type: '@clinic/SIGN_UP_FAILURE',
  };
}
export function clinicSignOut() {
  return {
    type: '@clinic/SIGN_OUT',
  };
}
