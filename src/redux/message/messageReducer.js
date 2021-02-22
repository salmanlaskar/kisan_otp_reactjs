import { SET_MESSAGE,MESSAGE_ERROR,MESSAGE_LOADING } from "./messageTypes";

const initialState = {
  data:[],
  error:{},
  loading: false
};

const MessageReducer=(state = initialState, action)=>{
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error:{}
      };
    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case MESSAGE_ERROR:
      return {
          ...state,
          loading: false,
          error:action.payload
      };
    default:
      return state;
  }
}
export default MessageReducer;
