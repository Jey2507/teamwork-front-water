import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import modalReducer from "./ModalSlice.js";
import { authReducer } from "./auth/slice.js";
import { waterReducer } from "./water/slice.js";
import { setupAxiosInterceptors } from "./auth/operations.js";
import storage from "redux-persist/lib/storage";

const authConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken'],
}
const waterConfig = {
    key: 'water',
    storage,
    whitelist: [
        'selectedDate',
        'selectedDateData',
        'selectedMonth',
        'monthData',
        'toggleInfo'
    ],
}
const persistorAuthReducer = persistReducer(authConfig, authReducer);
const persistorWaterReducer = persistReducer(waterConfig, waterReducer);

export const store = configureStore({
    reducer: {
        water: persistorWaterReducer,
        modal: modalReducer,
        auth: persistorAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
setupAxiosInterceptors(store);
export const persistor = persistStore(store);