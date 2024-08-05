import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addWaterReq, getWaterDayReq, getWaterMonthReq } from "./services.js";

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

export const getWaterDay = createAsyncThunk(
  'water/getWaterDay',
  async (day, thunkAPI) => {
    try {
      const response = await getWaterDayReq(day);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  'water/getWaterMonth',
  async (date, thunkAPI) => {
    try {
      const response = await getWaterMonthReq(date);
      return response.daysInMonth;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteWaterEntry = createAsyncThunk(
  'water/deleteWaterEntry',
  async (entryId, thunkAPI) => {
    try {
      await axios.delete(`/api/water/${entryId}`);
      return entryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
