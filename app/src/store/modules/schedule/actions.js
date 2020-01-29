export function eventsListRequest() {
  return {
    type: '@schedule/EVENTS_LIST_REQUEST',
    payload: {},
  };
}
export function eventsListSuccess(data, limits, schedules, dates) {
  return {
    type: '@schedule/EVENTS_LIST_SUCCESS',
    payload: { data, limits, schedules, dates },
  };
}
export function eventsListFailure() {
  return {
    type: '@schedule/EVENTS_LIST_FAILURE',
  };
}
