import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { addWater, deleteWaterEntry } from "./operations";

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
            .addCase(deleteWaterEntry.pending, handlePending)
            .addCase(deleteWaterEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.waterDay = state.waterDay.filter(item => item.id !== action.payload);
                // Update water progress and calendar items when get them ready
            })
            .addCase(deleteWaterEntry.rejected, handleRejected)
});

export const waterReducer = waterSlice.reducer;