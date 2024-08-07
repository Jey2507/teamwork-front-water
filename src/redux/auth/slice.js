import { createSlice } from "@reduxjs/toolkit";
import { initialStateConstant } from "./constants";
import { login, logout, refreshUser, register } from "./operations";

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateConstant,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
  }
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
