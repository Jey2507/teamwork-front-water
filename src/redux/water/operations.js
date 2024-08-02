import { createAsyncThunk } from "@reduxjs/toolkit";
import { addWaterReq } from "./services";

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