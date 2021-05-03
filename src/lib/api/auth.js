import axios from 'axios';

export const login = async ({ email, password }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/users/login`,
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
};

export const signup = async ({ email, username, password }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URI}/users/signup`,
    {
      email,
      username,
      password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    },
  );
  return response.data;
};
