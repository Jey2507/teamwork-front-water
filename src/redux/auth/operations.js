import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://aqua-app-teamwork.onrender.com/';


const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        clearAuthHeader();
        thunkAPI.dispatch(clearStore()); // Очищення Redux store
        localStorage.clear(); // Очищення localStorage
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
}); 