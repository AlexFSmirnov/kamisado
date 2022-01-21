import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { Player } from '../../enums/player';
import type { State } from '../store';
import { PieceInfo } from './piecesSlice';

interface GameState {
    isFirstTurn: boolean;
    currentPlayer: Player;
    selectedPiece: PieceInfo | null;
    wonByBlocking: boolean;
    wonByReachingTop: boolean;
}

const initialState: GameState = {
    isFirstTurn: true,
    currentPlayer: Player.First,
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
        setCurrentPlayer: (state, action: PayloadAction<Player>) => {
            state.currentPlayer = action.payload;
        },
        swapCurrentPlayer: (state) => {
            state.currentPlayer =
                state.currentPlayer === Player.First
                    ? Player.Second
                    : Player.First;
        },
        setSelectedPiece: (state, action: PayloadAction<PieceInfo | null>) => {
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
