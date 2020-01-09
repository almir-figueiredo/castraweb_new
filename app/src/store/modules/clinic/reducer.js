import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  id: null,
};

export default function clinic(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@clinic/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        draft.id = action.payload.profile.id;
        break;
      }
      case '@clinic/SIGN_UP_FAILURE': {
        draft.profile = null;
        break;
      }

      default:
    }
  });
}
