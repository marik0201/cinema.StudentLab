import types from '../types/cinemas';

const initialState = [
    {_id: '5cdd5b3044c73a128530ca81', name: 'Ракета'},

    {_id: '5cdd5b3044c73a128530ca81', name: 'Ракета'}
]

export function cinemas(
  state = initialState,
  action
) {
  switch (action.type) {
    case types.CINEMAS_LOADED:
      return {
        ...action.payload
      };

    default:
      return state;
  }
}
