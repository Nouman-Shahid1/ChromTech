import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth/authSlice";
import categoryReducer from "../reducers/Category/categorySlice";
import userReducer from "../reducers/User/userSlice";
import specialityReducer from "../reducers/Speciality/specialitySlice";
import serviceReducer from "../reducers/Service/serviceSlice";
import amenityReducer from "../reducers/Amenity/amenitySlice";
import cityReducer from "../reducers/City/citySlice";
import adminReducer from "../reducers/Admin/adminSlice";
import shopReducer from "../reducers/Shop/shopSlice";
import mediaReducer from "../reducers/Media/mediaSlice";

const rootReducer = combineReducers({
  admin: adminReducer,
  amenity: amenityReducer,
  auth: authReducer,
  category: categoryReducer,
  city: cityReducer,
  media: mediaReducer,
  service: serviceReducer,
  shop: shopReducer,
  speciality: specialityReducer,
  user: userReducer,
});

export default rootReducer;
