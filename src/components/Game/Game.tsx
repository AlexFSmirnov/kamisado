import { useRef, useEffect, useState } from 'react';
import { FIELD_MAX_SIZE } from '../../constants/field';
import { Field } from '../Field';
import { GameContainer, GameFieldContainer } from './style';

const Game = () => {
    const [gameFieldSize, setGameFieldSize] = useState(0);

    const gameContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                updateGameFieldSize(entry.contentRect);
            });
        });

        if (gameContainerRef.current) {
            resizeObserver.observe(gameContainerRef.current);
        }
    }, [gameContainerRef]);

    const updateGameFieldSize = (containerSize: {
        width: number;
        height: number;
    }) => {
        const { width: containerWidth, height: containerHeight } =
            containerSize;

        setGameFieldSize(
            Math.min(containerWidth, containerHeight) * FIELD_MAX_SIZE
        );
    };

    return (
        <GameContainer ref={gameContainerRef}>
            <GameFieldContainer size={gameFieldSize}>
                <Field />
            </GameFieldContainer>
        </GameContainer>
    );
};

export default Game;
