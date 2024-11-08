import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth/authSlice";
import categoryReducer from "../reducers/Category/categorySlice"
const rootReducer = combineReducers({
  auth: authReducer,
  category:categoryReducer,
});

export default rootReducer;
