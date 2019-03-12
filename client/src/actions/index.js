import {SIGN_IN, SIGN_OUT, FETCH_USER, TAB, BIDS} from "./types";
import plitApi from '../api/plitApi';

//just need to call auth to change state
export const trySignOut = () => async dispatch => {

    const response = await plitApi.post('/api/logout');

    dispatch ({
        type: 'SIGN_OUT'
    });
};

//needs to call api to get log in info and if there is a match you sign in
//then call auth to change state
export const trySignIn = (credentials) => async dispatch => {

    const response = await plitApi.post('/api/login', credentials);

    dispatch ({
        type: SIGN_IN,
        payload: response.data
    });
};

//response from server will be either the user if they are signed in or a '0'.
export const checkLoginStatus = () => async dispatch => {
    const response = await plitApi.get("/api/checkLoggedIn");

    dispatch ({
        type: SIGN_IN,
        payload: response.data
    });
};

export const tab = (tabName) => {
  return (
      {
          type: TAB,
          payload: tabName
      }
  )
};

export const bidList = () => async dispatch => {
    const response = await plitApi.get("/api/bids");

    dispatch ({
       type: BIDS,
       payload: response.data
    });
};

