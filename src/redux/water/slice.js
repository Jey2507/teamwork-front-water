import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { addWater, getWaterDay, getWaterMonth, updateWaterIntakeRecord, deleteWaterEntry } from "./operations";

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
  reducers: {
    setCurrentDate(state, action) {
      state.selectedMonth.year = action.payload.year;
      state.selectedMonth.month = action.payload.month;
    },
    setCurrentDay(state, action) {
      state.selectedDate = action.payload;
    },
    setShowStatistic(state, action) {
      state.showMonthStatistics = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.date = [...state.date, action.payload];
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(getWaterDay.pending, handlePending)
      .addCase(getWaterDay.fulfilled, (state, action) => {
        state.loading = false;
        state.date = action.payload.data;
        state.totalDayWater = action.payload.totalDayWater;
        state.items = action.payload.consumedWaterData;
      })
      .addCase(getWaterDay.rejected, handleRejected)

      .addCase(deleteWaterEntry.pending, handlePending)
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.entries.findIndex(
          item => item.id === action.payload.id
        );
        state.entries.splice(index, 1);
      })
      .addCase(deleteWaterEntry.rejected, handleRejected)

      .addCase(updateWaterIntakeRecord.pending, state => {
        state.loading = true;
      })
      .addCase(updateWaterIntakeRecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.entries.findIndex(
          item => item.id === action.payload.id
        );
        state.entries[index] = action.payload;
      })
      .addCase(updateWaterIntakeRecord.rejected, handleRejected)
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.monthData = action.payload;
      })
      .addCase(getWaterMonth.rejected, (state) => {
        state.error = true;
      })
});
export const { setCurrentDate, setCurrentDay, setShowStatistic } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;