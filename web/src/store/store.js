// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // Ensure this is correctly pointing to your rootReducer

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
