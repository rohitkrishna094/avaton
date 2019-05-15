import { baseUrl } from '../../api/apiInfo';
import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REMOVE_REGISTER_ERROR
} from '../actionTypes/actionTypes';

export const register = credentials => {
  return (dispatch, getState) => {
    // call backend service here
    const { username, password, name, email } = credentials;
    const url = `${baseUrl}/auth/register`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password, name, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        let error = {};
        if (!data.success) {
          error = data.msg;
          dispatch({ type: REGISTER_ERROR, payload: { error } });
        } else if (data.success) {
          dispatch({ type: REGISTER_SUCCESS, payload: { username } });
        }
      });
  };
};

export const login = credentials => {
  return (dispatch, getState) => {
    // call backend service here
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
        if (!data.success) {
          error = data.msg;
          dispatch({ type: LOGIN_ERROR, payload: { error } });
        } else if (data.success) {
          dispatch({ type: LOGIN_SUCCESS, payload: { token: data.token } });
        }
      });
  };
};

export const removeRegisterError = () => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_REGISTER_ERROR });
  };
};
