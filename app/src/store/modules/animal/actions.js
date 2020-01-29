export function animalsListRequest(id) {
  return {
    type: '@animal/ANIMALS_LIST_REQUEST',
    payload: { id },
  };
}

export function animalsListSuccess(animals, data) {
  return {
    type: '@animal/ANIMALS_LIST_SUCCESS',
    payload: { animals, data },
  };
}

export function allAnimalsRequest() {
  return {
    type: '@animal/ALL_ANIMALS_REQUEST',
    payload: {},
  };
}

export function allAnimalsSuccess(allAnimals) {
  return {
    type: '@animal/ALL_ANIMALS_SUCCESS',
    payload: { allAnimals },
  };
}

export function animalsListFailure() {
  return {
    type: '@animal/ANIMALS_LIST_FAILURE',
  };
}
