import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    axios.defaults.headers.common.Authorization = '';
    return true; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearStore: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearStore } = authSlice.actions;

export default authSlice.reducer;