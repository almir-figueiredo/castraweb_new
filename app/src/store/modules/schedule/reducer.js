import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  data: [],
  limits: [],
  schedules: [],
  dates: [],
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@schedule/EVENTS_LIST_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@schedule/EVENTS_LIST_SUCCESS': {
        draft.loading = false;
        draft.data = action.payload.data;
        draft.limits = action.payload.limits;
        draft.schedules = action.payload.schedules;
        draft.dates = action.payload.dates;
        break;
      }

      case '@schedule/EVENTS_LIST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
