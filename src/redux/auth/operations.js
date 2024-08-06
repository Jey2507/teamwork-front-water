import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearStore } from './slice.js';
import axios from "../../common/axiosConfig.js";
import { setToken } from "./slice";

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", userInfo);
      setAuthHeader(response.data.data.token);
      const profile = await axios.get("/user");

      return { ...response.data, user: profile.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
    thunkAPI.dispatch(clearStore());
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/update",
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    const persistedToken = reduxState.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/update');
      return res.data;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const setupAxiosInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { refreshToken } = store.getState().auth;
          const { data } = await axios.post("/auth/refresh", {
            refreshToken,
          });

          setAuthHeader(data.token);
          store.dispatch(
            setToken({ token: data.token, refreshToken: data.refreshToken })
          );
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};
