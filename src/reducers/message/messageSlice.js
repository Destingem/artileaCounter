import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetMessage: (state) => {
      state.message = null;
    },
  },
});

export const { resetMessage, setMessage } = messageSlice.actions;
export const selectMessage = (state) => state.message.message;
export default messageSlice.reducer;
