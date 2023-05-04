import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
    },
  },
});

export const { setUser } = authSlice.actions;
