import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth/authSlice";
import categoryReducer from "../reducers/Category/categorySlice";
import productReducer from "../reducers/Product/productSlice";
import userReducer from "../reducers/User/userSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  users: userReducer,
  
});

export default rootReducer;
