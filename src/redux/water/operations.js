import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  addWaterReq,
  getWaterMonthReq,
  deleteWaterReq,
  updateWaterIntakeReq,
} from './services';

export const addWater = createAsyncThunk(
  'water/addWater',
  async (waterData, thunkAPI) => {
    try {
      const response = await addWaterReq(waterData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterDay = createAsyncThunk(
  'water/getWaterDay',
  async (date, { rejectWithValue }) => {
    try {
      if (!date) {
        throw new Error('Date is required');
      }
      const { data } = await axios.get(`/water/daily-water?date=${date}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch daily water data');
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  'water/getWaterMonth',
  async (date, thunkAPI) => {
    try {
      const response = await getWaterMonthReq(date);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      if (!id) {
        throw new Error('ID is required');
      }
      await deleteWaterReq(id);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to delete water data');
    }
  }
);

export const updateWaterIntakeRecord = createAsyncThunk(
  'water/updateWaterIntakeRecord',
  async ({ id, formData }, thunkAPI) => {
    try {
      if (!id || !formData) {
        return thunkAPI.rejectWithValue('Invalid parameters: id or formData is missing');
      }
      const response = await updateWaterIntakeReq(id, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update water intake record');
    }
  }
);