import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { ColorType } from '../../types';
import type { State } from '../store';

export interface SelectedPieceInfo {
    index: number;
    type: ColorType;
    x: number;
    y: number;
}

interface GameState {
    isFirstTurn: boolean;
    currentPlayer: 1 | 2;
    selectedPiece: SelectedPieceInfo | null;
    wonByBlocking: boolean;
    wonByReachingTop: boolean;
}

const initialState: GameState = {
    isFirstTurn: true,
    currentPlayer: 1,
    selectedPiece: null,
    wonByBlocking: false,
    wonByReachingTop: false,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setIsFirstTurn: (state, action: PayloadAction<boolean>) => {
            state.isFirstTurn = action.payload;
        },
        setCurrentPlayer: (state, action: PayloadAction<1 | 2>) => {
            state.currentPlayer = action.payload;
        },
        swapCurrentPlayer: (state) => {
            state.currentPlayer = (3 - state.currentPlayer) as 1 | 2;
        },
        setSelectedPiece: (
            state,
            action: PayloadAction<SelectedPieceInfo | null>
        ) => {
            state.selectedPiece = action.payload;
        },
        setWonByBlocking: (state, action: PayloadAction<boolean>) => {
            state.wonByBlocking = action.payload;
        },
        setWonByReachingTop: (state, action: PayloadAction<boolean>) => {
            state.wonByReachingTop = action.payload;
        },
    },
});

export const {
    setIsFirstTurn,
    setCurrentPlayer,
    swapCurrentPlayer,
    setSelectedPiece,
    setWonByBlocking,
    setWonByReachingTop,
} = gameSlice.actions;

export const getGameState = (state: State) => state.game;

export const getIsFirstTurn = createSelector(
    getGameState,
    (state) => state.isFirstTurn
);

export const getCurrentPlayer = createSelector(
    getGameState,
    (state) => state.currentPlayer
);

export const getSelectedPieceInfo = createSelector(
    getGameState,
    (state) => state.selectedPiece
);

export default gameSlice.reducer;
