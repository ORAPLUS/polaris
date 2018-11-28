import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../reducers";

const initialState = {};

const middleware = applyMiddleware(thunk, logger);

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(middleware)
);

export default store;
