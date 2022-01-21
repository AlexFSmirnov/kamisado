import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './fieldSlice';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
    },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
