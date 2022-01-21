import { FIELD_CONFIGURATION } from '../constants';
import { getField, setFieldTileValue } from './slices/fieldSlice';
import {
    getCurrentPlayer,
    getSelectedPieceInfo,
    setIsFirstTurn,
    setSelectedPiece,
    swapCurrentPlayer,
} from './slices/gameSlice';
import { changePiecePosition, getPieces } from './slices/piecesSlice';
import { State, Dispatch } from './store';

export const moveTileTo =
    ({ x, y }: { x: number; y: number }) =>
    (dispatch: Dispatch, getState: () => State) => {
        const state = getState();

        const field = getField(state);
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
        dispatch(swapCurrentPlayer());
        dispatch(
            setSelectedPiece({
                index: newSelectedPieceIndex,
                ...newSelectedPiece,
            })
        );

        dispatch(setIsFirstTurn(false));
    };
