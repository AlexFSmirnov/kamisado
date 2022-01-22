import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './slices/fieldSlice';
import piecesReducer from './slices/piecesSlice';
import gameReducer from './slices/gameSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        pieces: piecesReducer,
        game: gameReducer,
        ui: uiReducer,
    },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
