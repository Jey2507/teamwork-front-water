import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addWaterReq } from "./services";

/* const getUnixDay = (date) => {
date.setHours(0, 0, 0, 0);

  return date.getTime();
}; */

export const addWater = createAsyncThunk(
    'water/addWater',
    async (newEntry, thunkAPI) => {
        try {
            const response = await addWaterReq(newEntry);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/delete-water/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWaterAmount = createAsyncThunk(
  'water/updateWaterAmount',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/update-water/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
/* 
export const getDayWater = createAsyncThunk(
  'water/getDayWater',
  async (date, thunkAPI) => {
    try {
      const response = await axios.get(`/daily-water?date=${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  'water/getMonthWater',
  async (month, thunkAPI) => {
    try {
      const unixMonthStartDate = getUnixDay(month);
      const response = await axios.get(`/monthly-water?date=${unixMonthStartDate}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTodaySummaryWater = createAsyncThunk(
  'water/getTodaySummaryWater',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/daily-water');
      const res = (response.data.todaySumamryWater / 1000).toFixed(1);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
); */