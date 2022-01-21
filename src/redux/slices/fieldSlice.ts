import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { FIELD_SIZE } from '../../constants';
import { Player } from '../../enums/player';
import { ColorType } from '../../types';
import type { State } from '../store';

export interface FieldPiece {
    player: Player;
    type: ColorType;
}

type FieldState = Array<Array<FieldPiece | null>>;

const initialState: FieldState = [
    // Top line of pieces for the second player.
    Array.from({ length: FIELD_SIZE }).map((_, i) => ({
        player: Player.Second,
        type: i as ColorType,
    })),

    // Six empty lines in between.
    ...Array.from({ length: 6 }).map((line) =>
        Array.from({ length: FIELD_SIZE }).map((_) => null)
    ),

    // Bottom line of pieces for the first player.
    Array.from({ length: FIELD_SIZE }).map((_, i) => ({
        player: Player.First,
        type: (7 - i) as ColorType,
    })),
];

export const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setFieldTileValue: (
            state,
            action: PayloadAction<{
                x: number;
                y: number;
                value: null | {
                    player: Player;
                    type: ColorType;
                };
            }>
        ) => {
            const { x, y, value } = action.payload;
            state[y][x] = value;
        },
    },
});

export const { setFieldTileValue } = fieldSlice.actions;

export const getField = (state: State) => state.field;
// export const getFieldTest = createSelector(
//     getFieldState,
//     (state) => state.test
// );

export default fieldSlice.reducer;
