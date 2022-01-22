import styled from 'styled-components';

export const EndScreenContainer = styled.div<{ active: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: white;
    opacity: ${(props) => (props.active ? 0.8 : 0)};
    transition: opacity 500ms;

    ${(props) => (props.active ? '' : 'pointer-events: none;')}
`;

export const EndScreenTextContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 32px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const EndScreenTitle = styled.h1`
    font-size: 56pt;
    text-align: center;
`;

export const EndScreenSubtitle = styled.h2`
    padding-top: 32px;
    font-size: 24pt;
    text-align: center;
`;

export const EndScreenNote = styled.span`
    padding-top: 48px;
    font-size: 16pt;
    opacity: 0.7;
`;
