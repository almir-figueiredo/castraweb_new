export function dateChange(data) {
  return {
    type: '@date/CHANGE',
    payload: { data },
  };
}
