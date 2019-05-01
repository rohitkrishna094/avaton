import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  REMOVE_SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../actionTypes/actionTypes';

const initialState = { signedUp: false, error: {}, token: null, loggedIn: false };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, signedUp: true, error: {} };
    case SIGNUP_ERROR:
      return { ...state, signedUp: false, error: action.payload.error };
    case REMOVE_SIGNUP_ERROR:
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
