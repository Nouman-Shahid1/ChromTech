import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // Import the combined rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
