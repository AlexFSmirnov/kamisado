import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { FIELD_SIZE } from '../../constants';
import { ColorType } from '../../types';
import type { State } from '../store';

export interface PieceInfo {
    player: 1 | 2;
    type: ColorType;
    x: number;
    y: number;
}

type PiecesState = Array<PieceInfo>;

const initialState: PiecesState = [
    ...Array.from({ length: FIELD_SIZE }).map((_, i) => ({
        player: 2 as 2,
        type: i as ColorType,
        x: i,
        y: 0,
    })),
    ...Array.from({ length: FIELD_SIZE }).map((_, i) => ({
        player: 1 as 1,
        type: (7 - i) as ColorType,
        x: i,
        y: 7,
    })),
];

export const piecesSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        changePiecePosition: (
            state,
            action: PayloadAction<{ index: number; x: number; y: number }>
        ) => {
            const { index, x, y } = action.payload;
            state[index] = { ...state[index], x, y };
        },
    },
});

export const { changePiecePosition } = piecesSlice.actions;

export const getPieces = (state: State) => state.pieces;

// export const getFieldState = (state: State) => state.field;
// export const getFieldTest = createSelector(
//     getFieldState,
//     (state) => state.test
// );

export default piecesSlice.reducer;
