import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { addWater, getWaterDay, getWaterMonth } from "./operations";

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
      setDate(state, action) {
        state.selectedDate = action.payload;
    },

    nextMonth(state) {
      const newMonth = state.selectedMonth.month + 1;
      if (newMonth <= 12) {
        state.selectedMonth.month = newMonth;
      } else {
        state.selectedMonth.month = 1;
        state.selectedMonth.year += 1;
      }
    },
    prevMonth(state) {
      const newMonth = state.selectedMonth.month - 1;
      if (newMonth >= 1) {
        state.selectedMonth.month = newMonth;
      } else {
        state.selectedMonth.month = 12;
        state.selectedMonth.year -= 1;
      }
    },
    setToggleInfo(state) {
      state.toggleInfo = !state.toggleInfo;
    },
  },
    extraReducers: (builder) =>
        builder
    .addCase(getWaterMonth.pending, (state) => {
      state.isLoadingMonth = true;
      state.errorMonth = null;
    })
    .addCase(getWaterMonth.fulfilled, (state, action) => {
      state.isLoadingMonth = false;
      state.monthData = [...action.payload];
    })
    .addCase(getWaterMonth.rejected, (state, action) => {
      state.isLoadingMonth = false;
      state.errorMonth = action.payload;
    })
    .addCase(getWaterDay.fulfilled, (state, action) => {
      state.isLoadingWaterDay = false;
      state.waterDay = [...action.payload.records];
      state.percentDay = action.payload.percentComplete;
    })
    .addCase(getWaterDay.rejected, (state, action) => {
      state.isLoadingWaterDay = false;
      state.errorWaterDay = action.payload;
    })
            .addCase(addWater.pending, handlePending)
            .addCase(addWater.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.waterDay = [...state.waterDay];
            })
            .addCase(addWater.rejected, handleRejected)

})



export const waterReducer = waterSlice.reducer;