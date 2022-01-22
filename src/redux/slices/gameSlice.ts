import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { Player } from '../../enums/player';
import type { State } from '../store';
import { PieceInfo } from './piecesSlice';

interface GameState {
    isFirstTurn: boolean;
    lastFirstPlayer: Player;
    currentPlayer: Player;
    selectedPiece: PieceInfo | null;
    wonByBlocking: boolean;
    wonByReachingTop: boolean;
}

const initialState: GameState = {
    isFirstTurn: true,
    lastFirstPlayer: Player.First,
    currentPlayer: Player.First,
    selectedPiece: null,
    wonByBlocking: false,
    wonByReachingTop: true,
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
        resetGame: (state) => {
            const newFirstPlayer =
                state.lastFirstPlayer === Player.First
                    ? Player.Second
                    : Player.First;

            state = {
                isFirstTurn: true,
                lastFirstPlayer: newFirstPlayer,
                currentPlayer: newFirstPlayer,
                selectedPiece: null,
                wonByBlocking: false,
                wonByReachingTop: false,
            };

            return state;
        },
    },
});

export const {
    setIsFirstTurn,
    swapCurrentPlayer,
    setSelectedPiece,
    setWonByBlocking,
    setWonByReachingTop,
    resetGame,
} = gameSlice.actions;

export const getGameState = (state: State) => state.game;

export const getIsFirstTurn = createSelector(
    getGameState,
    (state) => state.isFirstTurn
);

export const getLastFirstPlayer = createSelector(
    getGameState,
    (state) => state.lastFirstPlayer
);

export const getCurrentPlayer = createSelector(
    getGameState,
    (state) => state.currentPlayer
);

export const getSelectedPieceInfo = createSelector(
    getGameState,
    (state) => state.selectedPiece
);

export const getWonByBlocking = createSelector(
    getGameState,
    (state) => state.wonByBlocking
);

export const getWonByReachingTop = createSelector(
    getGameState,
    (state) => state.wonByReachingTop
);

export default gameSlice.reducer;
