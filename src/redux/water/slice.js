import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { addWater } from "./operations";

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
            .addCase(addWater.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.waterDay = [...state.waterDay];
            })
            .addCase(addWater.rejected, handleRejected)

});

export const waterReducer = waterSlice.reducer;