import axios from 'axios';
import types from '../types/cinemas';

export const cinemasLoadedSuccess = payload => {
    return { type:types.CINEMAS_LOADED, payload }
}

export const getCinemas = () => async dispatch => {
    try {
        const cinemas = await axios.get('http://localhost:3000/api/cinemas')
        dispatch(cinemasLoadedSuccess(cinemas.data.cinemas))
    } catch (e) {
        
    }
};
