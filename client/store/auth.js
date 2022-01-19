import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  // check user localStorage for a token
  const token = window.localStorage.getItem(TOKEN);

  // if a token is found, pass it as the header to /auth/me
  // dispatch that response to setAuth
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
    // if there is no token found in localStorage, do nothing.
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    //take in username, password, and 'login':'signup'
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      //attempt to login or sign up - axios will return a token.
      // set that token to TOKEN in localStorage, then run me()
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
