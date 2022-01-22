import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { FIELD_SIZE } from '../../constants';
import { Player } from '../../enums/player';
import { ColorType } from '../../types';
import type { State } from '../store';

export interface PieceInfo {
    player: Player;
    type: ColorType;
    x: number;
    y: number;
}

type PlayerPieces = {
    [key in keyof ColorType]: PieceInfo;
};

type PiecesState = {
    [key in Player]: PlayerPieces;
};

const initialState: PiecesState = {
    [Player.First]: Object.fromEntries(
        Array.from({ length: FIELD_SIZE }).map((_, i) => [
            i as ColorType,
            {
                player: Player.First,
                type: i as ColorType,
                x: 7 - i,
                y: 7,
            },
        ])
    ) as PlayerPieces,
    [Player.Second]: Object.fromEntries(
        Array.from({ length: FIELD_SIZE }).map((_, i) => [
            i as ColorType,
            {
                player: Player.Second,
                type: i as ColorType,
                x: i,
                y: 0,
            },
        ])
    ) as PlayerPieces,
};

export const piecesSlice = createSlice({
    name: 'pieces',
    initialState,
    reducers: {
        changePiecePosition: (
            state,
            action: PayloadAction<{
                player: Player;
                type: ColorType;
                x: number;
                y: number;
            }>
        ) => {
            const { player, type } = action.payload;
            // @ts-ignore Cannot use union types as object keys
            state[player][type] = action.payload;
        },
        resetPieces: () => initialState,
    },
});

export const { changePiecePosition, resetPieces } = piecesSlice.actions;

export const getPieces = (state: State) => state.pieces;

export const getPiecesList = createSelector(getPieces, (pieces) =>
    Object.values(pieces).map(Object.values).flat()
);

export const getField = createSelector(getPiecesList, (pieces) => {
    let field = Array.from({ length: FIELD_SIZE }).map((_) =>
        Array.from({ length: FIELD_SIZE }).map((_) => false)
    );

    pieces.forEach(({ x, y }) => {
        field[y][x] = true;
    });

    return field;
});

export default piecesSlice.reducer;
