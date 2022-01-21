import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { ColorType } from '../types';
import type { State } from './store';

export interface PieceInfo {
    player: 1 | 2;
    type: ColorType;
    x: number;
    y: number;
}

type PiecesState = Array<PieceInfo>;

const initialState: PiecesState = [
    ...Array.from({ length: 8 }).map((_, i) => ({
        player: 2 as 2,
        type: i as ColorType,
        x: i,
        y: 0,
    })),
    ...Array.from({ length: 8 }).map((_, i) => ({
        player: 1 as 1,
        type: (7 - i) as ColorType,
        x: i,
        y: 7,
    })),
];

export const piecesSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {},
});

// export const { setTest } = fieldSlice.actions;

export const getPieces = (state: State) => state.pieces;

// export const getFieldState = (state: State) => state.field;
// export const getFieldTest = createSelector(
//     getFieldState,
//     (state) => state.test
// );

export default piecesSlice.reducer;
