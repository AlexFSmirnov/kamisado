import styled from 'styled-components';
import { PIECE_SIZE, TILE_COLORS } from '../../constants';
import { ColorType } from '../../types';

interface PieceOuterElementProps {
    player: 1 | 2;
    x: number;
    y: number;
    interactive?: boolean;
}

export const PieceOuterElement = styled.div<PieceOuterElementProps>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${12.5 * PIECE_SIZE}%;
    height: ${12.5 * PIECE_SIZE}%;
    margin: ${(12.5 * (1 - PIECE_SIZE)) / 2}%;

    background-color: ${(props) => (props.player === 1 ? 'white' : 'black')};
    ${(props) => (props.player === 1 ? 'border-radius: 50%;' : '')}

    transform: translate3d(
        ${(props) => (props.x * 100) / PIECE_SIZE}%,
        ${(props) => (props.y * 100) / PIECE_SIZE}%,
        0
    );
    transition: transform 300ms;

    ${(props) => (props.interactive ? 'cursor: pointer;' : '')}
`;

interface PieceInnerElementProps {
    player: 1 | 2;
    type: ColorType;
}

export const PieceInnerElement = styled.div<PieceInnerElementProps>`
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;

    background-color: ${(props) => TILE_COLORS[props.type]};
    ${(props) => (props.player === 1 ? 'border-radius: 50%;' : '')}
`;
