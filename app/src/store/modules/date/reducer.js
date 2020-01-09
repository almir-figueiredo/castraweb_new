import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function date(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@date/CHANGE': {
        draft.data = action.payload.data;
        break;
      }
      default:
    }
  });
}
