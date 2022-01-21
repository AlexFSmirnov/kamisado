import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './fieldSlice';
import piecesReducer from './piecesSlice';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        pieces: piecesReducer,
    },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
