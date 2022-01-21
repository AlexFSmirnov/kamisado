import { FIELD_CONFIGURATION, FIELD_SIZE } from '../constants';
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

        const { index, type, x: oldX, y: oldY } = selectedPieceInfo;

        const newSelectedColor = FIELD_CONFIGURATION[y][x];
        const newSelectedPieceIndex =
            currentPlayer === 1 ? newSelectedColor : 15 - newSelectedColor;
        const newSelectedPiece = pieces[newSelectedPieceIndex];

        dispatch(changePiecePosition({ index, x, y }));
        dispatch(
            setFieldTileValue({ x, y, value: { player: currentPlayer, type } })
        );
        dispatch(setFieldTileValue({ x: oldX, y: oldY, value: null }));

        if (
            (currentPlayer === 1 && y === 0) ||
            (currentPlayer === 2 && y === FIELD_SIZE - 1)
        ) {
            dispatch(setWonByReachingTop(true));
            dispatch(setSelectedPiece(null));
            return;
        }

        dispatch(
            setSelectedPiece({
                index: newSelectedPieceIndex,
                ...newSelectedPiece,
            })
        );
        dispatch(swapCurrentPlayer());

        if (!getAvailableTiles(getState())?.length) {
            dispatch(swapCurrentPlayer());
            dispatch(setWonByBlocking(true));
        }
    };
