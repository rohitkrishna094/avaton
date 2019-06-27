import { baseUrl } from '../../api/apiInfo';
import { REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, REMOVE_REGISTER_ERROR } from '../actionTypes/';

export const register = credentials => {
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
        if (data.status !== 200) {
          error = data.error;
          dispatch({ type: REGISTER_ERROR, payload: { error } });
        } else if (data.status === 200) {
          dispatch({ type: REGISTER_SUCCESS, payload: { username } });
        }
      });
  };
};

export const login = credentials => {
  return (dispatch, getState) => {
    // call backend servic ehere
    const { username, password } = credentials;
    const url = `${baseUrl}/auth/signin`;

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

export const removeRegisterError = () => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_REGISTER_ERROR });
  };
};
