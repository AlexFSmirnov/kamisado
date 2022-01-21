import styled, { keyframes } from 'styled-components';
import { PIECE_SIZE } from '../../constants';
import { Player } from '../../enums/player';

interface AnimatedPositionInfo {
    x: number;
    y: number;
    startX: number;
    startY: number;
}

const AvailableTileMarkerAnimation = ({
    x,
    y,
    startX,
    startY,
}: AnimatedPositionInfo) => keyframes`
    0% {
        opacity: 0;
        transform: translate3d(
            ${(startX * 100) / PIECE_SIZE}%,
            ${(startY * 100) / PIECE_SIZE}%,
            0
        );
    }

    100% {
        opacity: 0.7;
        transform: translate3d(
            ${(x * 100) / PIECE_SIZE}%,
            ${(y * 100) / PIECE_SIZE}%,
            0
        );
    }
`;

export const AvailableTileMarkerOuterElement = styled.div<AnimatedPositionInfo>`
    position: absolute;
    top: 0;
    left: 0;
    width: ${12.5 * PIECE_SIZE}%;
    height: ${12.5 * PIECE_SIZE}%;
    margin: ${(12.5 * (1 - PIECE_SIZE)) / 2}%;

    backface-visibility: hidden;
    animation-name: ${AvailableTileMarkerAnimation};
    animation-duration: 250ms;
    animation-fill-mode: forwards;

    cursor: pointer;
`;

interface AvailableTileMarkerInnerElementProps {
    player: Player;
}

export const AvailableTileMarkerInnerElement = styled.div<AvailableTileMarkerInnerElementProps>`
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;

    background-color: ${(props) =>
        props.player === Player.First ? 'white' : 'black'};
    ${(props) => (props.player === Player.First ? 'border-radius: 50%;' : '')}
`;
