import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addWaterReq, getWaterDayReq, getWaterMonthReq } from "./services.js";

export const addWater = createAsyncThunk(
  'water/add-water',
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
  'water/get-DailyWater',
  async (date, thunkAPI) => {
    try {
      const response = await getWaterDayReq(date);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  'water/get-MonthlyWater',
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
  'water/delete-WaterItem',
  async (entryId, thunkAPI) => {
    try {
      await axios.delete(`/api/water/${entryId}`);
      return entryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateWaterIntakeRecord = createAsyncThunk(
  'water/update-WaterItem',
  async (recordData, thunkAPI) => {
    try {
      const response = await axios.put(`/api/water/${recordData.id}`, recordData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// export const getTodaySumamryWater = createAsyncThunk(
//   'water/getTodaySummaryWater',
//   async (_, thunkAPI) => {
//     try {
//       const response = await getTodaySumamryWaterReq('/water/today');
//       const res = (response.data.todaySumamryWater / 1000).toFixed(1);
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

