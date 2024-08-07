import { createSlice } from "@reduxjs/toolkit";
import { addWater, getWaterDay, getWaterMonth, deleteWater } from "./operations";

const initialState = {
  date: null,
  totalDayWater: 0,
  items: [],
  monthItems: [],
  loading: false,
  error: false,
};

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
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = [...state.items, action.payload];
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(getWaterDay.pending, (state) => {
        state.error = false;
      })
      .addCase(getWaterDay.fulfilled, (state, action) => {
        state.date = action.payload.date;
        state.totalDayWater = action.payload.totalDayWater;
        state.items = action.payload.consumedWaterData;
      })
      .addCase(getWaterDay.rejected, (state) => {
        state.error = true;
      })
     .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.monthItems = action.payload;
      })
      .addCase(getWaterMonth.rejected, (state) => {
        state.error = true;
      })
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload);
        // Update water progress and calendar items when get them ready
      })
      .addCase(deleteWater.rejected, handleRejected)
});

export const waterReducer = waterSlice.reducer;