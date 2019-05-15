import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REMOVE_REGISTER_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actionTypes/actionTypes';

const initialState = { registered: false, error: {}, token: null, loggedIn: false };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, registered: true, error: {} };
    case REGISTER_ERROR:
      return { ...state, registered: false, error: action.payload.error };
    case REMOVE_REGISTER_ERROR:
      return { ...state, error: null };
    case LOGIN_ERROR:
      return { ...state, error: action.payload.error, token: null, loggedIn: false };
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token, error: {}, loggedIn: true };
    default:
      return state;
  }
};

export default authReducer;
