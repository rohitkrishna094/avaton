import jwt_decode from 'jwt-decode';

export const saveToken = token => {
  localStorage.removeItem('token');
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const val = localStorage.getItem('token');
  //   console.log(val + ' : ' + (val !== null));
  return val !== null;
};

export const setHeaders = headers => {
  if (localStorage.getItem('token')) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  } else {
    return headers;
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  removeToken();
};

export const getCurrentUserName = () => {
  return _getCurrentUserName(getToken());
};

const _getCurrentUserName = token => {
  const decoded = jwt_decode(token);
  return decoded.sub;
};
