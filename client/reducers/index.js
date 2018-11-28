import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import appReducer from "./appReducer";
import productReducer from "./productReducer";

export default combineReducers({
  errors: errorReducer,
  app: appReducer,
  product: productReducer
});
