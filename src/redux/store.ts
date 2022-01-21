import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './slices/fieldSlice';
import piecesReducer from './slices/piecesSlice';
import gameReducer from './slices/gameSlice';

export const store = configureStore({
    reducer: {
        field: fieldReducer,
        pieces: piecesReducer,
        game: gameReducer,
    },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
