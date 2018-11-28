import { GET_SETTINGS, APP_LOADING } from "../actions/types";

const initialState = {
  settings: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case APP_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
