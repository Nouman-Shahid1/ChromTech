import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth/authSlice";
import categoryReducer from "../reducers/Category/categorySlice";
import productReducer from "../reducers/Product/productSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product:productReducer,
  
});

export default rootReducer;
