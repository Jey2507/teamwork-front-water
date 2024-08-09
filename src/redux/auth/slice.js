import { createSlice } from "@reduxjs/toolkit";
import { initialStateConstant } from "./constants";
import { login, logout, refreshUser, register, updateUser } from "./operations";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const authSlice = createSlice({
  name: "auth",
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
        
        state.user = action.payload.user;
        state.token = action.payload.token;
        // console.log(action.payload, "action.payload")
        // state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.refreshToken = cookies.get("refreshToken");
        console.log(cookies.get("refreshToken"), "refreshToken")
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        console.log(cookies.get("refreshToken"), "refreshToken")
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload.data);
        let {
          name,
          email,
          gender,
          weight,
          dailyTimeActivity,
          dailyNorma,
          avatar,
        } = action.payload.data;
        state.user.name = name;
        state.user.email = email;
        state.user.gender = gender;
        state.user.weight = weight;
        state.user.dailyTimeActivity = dailyTimeActivity;
        state.user.dailyNorma = dailyNorma;
        state.user.avatar = avatar;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
