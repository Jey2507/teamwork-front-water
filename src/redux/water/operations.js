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
      return response;
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

export const deleteWater = createAsyncThunk(
  'water/delete-water',
  async (entryId, thunkAPI) => {
    try {
      await axios.delete(`/water/delete-water/${entryId}`);
      return { id: entryId }; // Return the deleted entry's ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateWaterIntakeRecord = createAsyncThunk(
  'water/updateWaterIntakeRecord',
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

