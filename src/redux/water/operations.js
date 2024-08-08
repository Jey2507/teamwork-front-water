import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addWaterReq, getWaterDayReq, getWaterMonthReq } from "./services.js";

export const addWater = createAsyncThunk(
  'water/add-water',
  async (newEntry, thunkAPI) => {
    try {
      const response = await addWaterReq(newEntry);
      return response; // Should return the new water entry
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterDay = createAsyncThunk(
  'water/daily-water',
  async (date, thunkAPI) => {
    try {
      const response = await getWaterDayReq(date);
      return response; // Should return data for the day
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  'water/monthly-water',
  async (date, thunkAPI) => {
    try {
      const response = await getWaterMonthReq(date);
      return response; // Should return month data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterEntry = createAsyncThunk(
  'water/delete-water',
  async (entryId, thunkAPI) => {
    try {
      await axios.delete(`/water/delete-water/${entryId}`);
      return { id: entryId }; // Return the deleted entry's ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);