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
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterDay = [...state.waterDay, action.payload];
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(getWaterDay.pending, handlePending)
      .addCase(getWaterDay.fulfilled, (state, action) => {
        state.date = action.payload.data;
        state.totalDayWater = action.payload.totalDayWater;
        state.items = action.payload.consumedWaterData;
      })
      .addCase(getWaterDay.rejected, (state) => {
        state.error = true;
      })

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

      // .addCase(getTodaySumamryWater.pending, (state) => {
      //   state.error = false;
      // })
      // .addCase(getTodaySumamryWater.fulfilled, (state, action) => {
      //   state.todaySumamryWater = action.payload; // Оновлення поля todaySumamryWater
      // })
      // .addCase(getTodaySumamryWater.rejected, (state) => {
      //   state.error = true;
      // })
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.monthData = action.payload;
      })
      .addCase(getWaterMonth.rejected, (state) => {
        state.error = true;
      })
  // .addCase(deleteWaterEntry.pending, handlePending)
  // .addCase(deleteWaterEntry.fulfilled, (state, action) => {
  //   state.loading = false;
  //   state.error = null;
  //   state.waterDay = state.waterDay.filter(item => item.id !== action.payload);
  //   // Update water progress and calendar items when get them ready
  // })
  // .addCase(deleteWaterEntry.rejected, handleRejected)
});
export const { setCurrentDate, setCurrentDay } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;