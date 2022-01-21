import { FIELD_CONFIGURATION, FIELD_SIZE } from '../constants';
import { Player } from '../enums/player';
import { getAvailableTiles } from './selectors';
import { getField, setFieldTileValue } from './slices/fieldSlice';
import {
    getCurrentPlayer,
    getSelectedPieceInfo,
    setIsFirstTurn,
    setSelectedPiece,
    setWonByBlocking,
    setWonByReachingTop,
    swapCurrentPlayer,
} from './slices/gameSlice';
import { changePiecePosition, getPieces } from './slices/piecesSlice';
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

        const { type, x: oldX, y: oldY } = selectedPieceInfo;

        const newPlayer =
            currentPlayer === Player.First ? Player.Second : Player.First;
        const newSelectedColorType = FIELD_CONFIGURATION[y][x];
        // @ts-ignore Cannot use union types as object keys
        const newSelectedPiece = pieces[newPlayer][newSelectedColorType];
        console.log({ newPlayer, newSelectedColorType, newSelectedPiece });

        dispatch(changePiecePosition({ player: currentPlayer, type, x, y }));
        dispatch(
            setFieldTileValue({ x, y, value: { player: currentPlayer, type } })
        );
        dispatch(setFieldTileValue({ x: oldX, y: oldY, value: null }));

        if (
            (currentPlayer === Player.First && y === 0) ||
            (currentPlayer === Player.Second && y === FIELD_SIZE - 1)
        ) {
            dispatch(setWonByReachingTop(true));
            dispatch(setSelectedPiece(null));
            return;
        }

        dispatch(setSelectedPiece(newSelectedPiece));
        dispatch(swapCurrentPlayer());

        if (!getAvailableTiles(getState())?.length) {
            dispatch(swapCurrentPlayer());
            dispatch(setWonByBlocking(true));
            dispatch(setSelectedPiece(null));
        }
    };
