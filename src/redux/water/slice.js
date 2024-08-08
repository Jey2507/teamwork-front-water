import { createSlice } from "@reduxjs/toolkit";
import { addWater, getWaterDay, getWaterMonth, deleteWaterEntry } from "./operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    date: null,
    totalDayWater: 0,
    items: [], // Array of water entries for the day
    monthData: [], // Data for the month
    loading: false,
    error: null,
    waterDay: [], // List of water entries
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterDay = [...state.waterDay, action.payload];
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(getWaterDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterDay.fulfilled, (state, action) => {
        state.loading = false;
        state.date = action.payload.date; // Response should contain date
        state.totalDayWater = action.payload.totalDayWater; // Response should contain totalDayWater
        state.items = action.payload.entries; // Ensure response has entries
      })
      .addCase(getWaterDay.rejected, handleRejected)
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.monthData = action.payload; // Ensure response has month data
      })
      .addCase(getWaterMonth.rejected, handleRejected)
      .addCase(deleteWaterEntry.pending, handlePending)
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterDay = state.waterDay.filter(item => item.id !== action.payload.id); // Match response structure
      })
      .addCase(deleteWaterEntry.rejected, handleRejected)
});

export const waterReducer = waterSlice.reducer;