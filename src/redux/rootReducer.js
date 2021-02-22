import {combineReducers} from 'redux';
import messageReducer from './message/messageReducer';

export default combineReducers({
  message: messageReducer,
});
