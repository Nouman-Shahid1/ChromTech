import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
