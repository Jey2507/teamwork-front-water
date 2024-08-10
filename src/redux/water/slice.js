import { createSlice } from '@reduxjs/toolkit';
import { addWater, getWaterDay, getWaterMonth, deleteWater, updateWaterIntakeRecord } from './operations';

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    date: null,
    totalDayWater: 0,
    items: [],
    monthData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addWater.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.totalDayWater += action.payload.amount;
      })
      .addCase(getWaterDay.fulfilled, (state, action) => {
        state.loading = false;
        state.date = action.payload.date;
        state.totalDayWater = action.payload.totalDayWater;
    
      })
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.monthData = action.payload;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
        state.totalDayWater -= action.payload.amount;
      })
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
});

export const waterReducer = waterSlice.reducer;
