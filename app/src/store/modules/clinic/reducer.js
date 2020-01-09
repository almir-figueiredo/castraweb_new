import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function clinicAuth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@clinic/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@clinic/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@clinic/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@clinic/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
