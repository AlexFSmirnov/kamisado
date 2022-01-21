import { createSelector } from 'reselect';
import { FIELD_SIZE } from '../constants';
import { Player } from '../enums/player';
import { getField } from './slices/fieldSlice';
import { getCurrentPlayer, getSelectedPieceInfo } from './slices/gameSlice';

export const getAvailableTiles = createSelector(
    getField,
    getCurrentPlayer,
    getSelectedPieceInfo,
    (field, currentPlayer, selectedPieceInfo) => {
        console.log({ selectedPieceInfo });
        if (selectedPieceInfo === null) {
            return null;
        }

        let availableTiles = [];
        const { x: startX, y: startY } = selectedPieceInfo;
        const yStep = currentPlayer === Player.First ? -1 : 1;

        // Straight line
        for (let offset = 1; offset < FIELD_SIZE; ++offset) {
            const y = startY + offset * yStep;

            if (y < 0 || y >= FIELD_SIZE || field[y][startX] !== null) {
                break;
            }

            availableTiles.push({
                x: startX,
                y,
            });
        }

        // Left diagonal
        for (let offset = 1; offset < FIELD_SIZE; ++offset) {
            const y = startY + offset * yStep;
            const x = startX - offset;

            if (
                y < 0 ||
                y >= FIELD_SIZE ||
                x < 0 ||
                x >= FIELD_SIZE ||
                field[y][x] !== null
            ) {
                break;
            }

            availableTiles.push({
                x,
                y,
            });
        }

        // Right diagonal
        for (let offset = 1; offset < FIELD_SIZE; ++offset) {
            const y = startY + offset * yStep;
            const x = startX + offset;

            if (
                y < 0 ||
                y >= FIELD_SIZE ||
                x < 0 ||
                x >= FIELD_SIZE ||
                field[y][x] !== null
            ) {
                break;
            }

            availableTiles.push({
                x,
                y,
            });
        }

        return availableTiles;
    }
);
