export function signInRequest(studentId) {
  return {
    type: '@student/SIGN_IN_REQUEST',
    payload: { studentId },
  };
}

export function signInSuccess(studentId) {
  return {
    type: '@student/SIGN_IN_SUCCESS',
    payload: { studentId, signed: true },
  };
}

export function signOut() {
  return {
    type: '@student/SIGN_OUT',
    payload: { signed: false },
  };
}
