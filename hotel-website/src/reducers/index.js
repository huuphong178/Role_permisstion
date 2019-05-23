import { combineReducers } from 'redux'
import rooms from './rooms'
import itemEditing from './itemEditing'
const appReducers = combineReducers({
    rooms,
    itemEditing
});

export default appReducers; 