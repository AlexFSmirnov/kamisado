import { FIELD_CONFIGURATION, FIELD_SIZE } from '../constants';
import { Player } from '../enums/player';
import {
    getCurrentPlayer,
    getSelectedPieceInfo,
    resetGame,
    setIsFirstTurn,
    setSelectedPiece,
    setWonByBlocking,
    setWonByReachingTop,
    swapCurrentPlayer,
} from './slices/gameSlice';
import {
    changePiecePosition,
    getPieces,
    resetPieces,
} from './slices/piecesSlice';
import { AppScreen, setScreen } from './slices/uiSlice';
import { getAvailableTiles } from './selectors';
import { State, Dispatch } from './store';

export const moveTileTo =
    ({ x, y }: { x: number; y: number }) =>
    (dispatch: Dispatch, getState: () => State) => {
        dispatch(setIsFirstTurn(false));

        const state = getState();

        const pieces = getPieces(state);
        const currentPlayer = getCurrentPlayer(state);
        const selectedPieceInfo = getSelectedPieceInfo(state);

        if (!selectedPieceInfo) {
            return;
        }

        const { type } = selectedPieceInfo;
        dispatch(changePiecePosition({ player: currentPlayer, type, x, y }));

        if (
            (currentPlayer === Player.First && y === 0) ||
            (currentPlayer === Player.Second && y === FIELD_SIZE - 1)
        ) {
            dispatch(setWonByReachingTop(true));
            dispatch(setSelectedPiece(null));

            window.setTimeout(() => {
                dispatch(setScreen(AppScreen.End));
            }, 300);

            return;
        }

        const newPlayer =
            currentPlayer === Player.First ? Player.Second : Player.First;
        const newSelectedColorType = FIELD_CONFIGURATION[y][x];
        // @ts-ignore Cannot use union types as object keys
        const newSelectedPiece = pieces[newPlayer][newSelectedColorType];

        dispatch(setSelectedPiece(newSelectedPiece));
        dispatch(swapCurrentPlayer());

        if (!getAvailableTiles(getState())?.length) {
            dispatch(swapCurrentPlayer());
            dispatch(setWonByBlocking(true));
            dispatch(setSelectedPiece(null));

            window.setTimeout(() => {
                dispatch(setScreen(AppScreen.End));
            }, 300);
        }
    };

export const startNewGame = () => (dispatch: Dispatch) => {
    dispatch(resetGame());
    dispatch(resetPieces());
    dispatch(setScreen(AppScreen.Game));
};
