import { combineReducers } from 'redux';

import { users } from './user'
import { cinemas } from './cinemas'

const rootReducer = combineReducers({
    users, cinemas
})

export default rootReducer;