import axios from "axios";

import { GET_SETTINGS, APP_LOADING } from "./types";

// Get Settings
export const getSettings = () => dispatch => {
  dispatch(setAppLoading());
  axios({
    url: `https://polar-dusk-71351.herokuapp.com/shopify/api/products.json`,
    method: "GET",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  })
    .then(res =>
      dispatch({
        type: GET_SETTINGS,
        payload: res.data.products
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SETTINGS,
        payload: null
      })
    );
};

// Set loading state
export const setAppLoading = () => {
  return {
    type: APP_LOADING
  };
};
