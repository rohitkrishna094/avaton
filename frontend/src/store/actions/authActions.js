import { baseUrl } from '../../api/apiInfo';
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REMOVE_SIGNUP_ERROR
} from '../actionTypes/actionTypes';

export const signup = credentials => {
  return (dispatch, getState) => {
    // call backend service here
    const { username, password } = credentials;
    const url = `${baseUrl}/auth/register`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        let error = {};
        if (!data.success) {
          error = data.msg;
          dispatch({ type: SIGNUP_ERROR, payload: { error } });
        } else if (data.success) {
          dispatch({ type: SIGNUP_SUCCESS, payload: { username } });
        }
      });
  };
};

export const login = credentials => {
  return (dispatch, getState) => {
    // call backend servic ehere
    const { username, password } = credentials;
    const url = `${baseUrl}/auth/login`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        let error = {};
        if (data.status !== 200) {
          error = data.error;
          dispatch({ type: LOGIN_ERROR, payload: { error } });
        } else if (data.status === 200) {
          dispatch({ type: LOGIN_SUCCESS, payload: { token: data.accessToken } });
        }
      });
  };
};

export const removeSignUpError = () => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_SIGNUP_ERROR });
  };
};
