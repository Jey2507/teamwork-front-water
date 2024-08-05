import { createAsyncThunk } from "@reduxjs/toolkit";
import { addWaterReq, getWaterDayReq, getWaterMonthReq} from "./services";

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
  export const getTodaySumamryWater = createAsyncThunk(
    'water/getTodaySummaryWater',
    async (_, thunkAPI) => {
      try {
        const response = await getTodaySumamryWaterReq('/water/today');
        const res = (response.data.todaySumamryWater / 1000).toFixed(1);
        return res;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );