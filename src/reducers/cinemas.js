import types from '../types/cinemas';

export function cinemas(
  state = [],
  action
) {
  switch (action.type) {
    case types.CINEMAS_LOADED:
      return [
        ...action.payload
      ];

    default:
      return state;
  }
}
