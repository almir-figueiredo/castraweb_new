import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  animals: [],
  data: [],
  allAnimals: [],
};

export default function schedule(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@animal/ANIMALS_LIST_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@animal/ANIMALS_LIST_SUCCESS': {
        draft.loading = false;
        draft.animals = action.payload.animals;
        draft.data = action.payload.data;
        break;
      }
      case '@animal/ALL_ANIMALS_SUCCESS': {
        draft.loading = false;
        draft.allAnimals = action.payload.allAnimals;
        break;
      }

      default:
    }
  });
}
