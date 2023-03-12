import { configureStore } from "@reduxjs/toolkit";

// reducers
import AppReducer from "../reducers/appSlice";
import MessageReducer from "../reducers/message/messageSlice";

// store configuration
export const store = configureStore({
  reducer: {
    app: AppReducer,
    message: MessageReducer,
  },
});
