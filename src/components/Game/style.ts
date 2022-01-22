import styled from 'styled-components';

export const GameContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GameFieldContainer = styled.div<{ size: number }>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;

    box-shadow: 0 0 8px black;
    border-radius: 16px;
`;
