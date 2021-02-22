import axios from '../../utils/axios';
import {SET_MESSAGE, MESSAGE_LOADING, MESSAGE_ERROR} from './messageTypes';

export const getMessage = () => (dispatch) => {
  dispatch(setMessageLoading());
  axios({url: '/message', method: 'GET'})
    .then((res) => res.data)
    .then((data) => {
      dispatch(setMessage(data));
    })
    .catch((err) => {
      dispatch({
        type: MESSAGE_ERROR,
        payload: {message: 'Something went wrong'},
      });
    });
};

export const setMessage = (data) =>{
  return {
    type: SET_MESSAGE,
    payload: data,
  };
};
export const setMessageLoading = () => {
  return {
    type: MESSAGE_LOADING,
  };
};
