import { createSlice } from "@reduxjs/toolkit";
import { initialStateConstant } from "./constants";

const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateConstant,
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase()
    }
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;