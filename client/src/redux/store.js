import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice"
import indicatorReducer from "./indicatorSlice"

const store = configureStore({
  reducer: {
    loader : loaderReducer,
    user: userReducer,
    indicator: indicatorReducer,
  },
});

export default store;
