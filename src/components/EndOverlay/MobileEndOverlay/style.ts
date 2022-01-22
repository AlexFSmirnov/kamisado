import styled from 'styled-components';

export const OverlayContainer = styled.div<{ active: boolean }>`
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

export const OverlayTextContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 32px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const OverlayTextBlockContainer = styled.div<{ flipped?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${(props) => (props.flipped ? 'transform: rotate3d(0, 0, 1, 180deg);' : '')}
`;

export const OverlayTitle = styled.h1`
    font-size: 32pt;
    text-align: center;
`;

export const OverlaySubtitle = styled.h2`
    padding-top: 8px;
    font-size: 18pt;
    text-align: center;
`;

export const OverlayNote = styled.span`
    padding-top: 32px;
    font-size: 12pt;
    opacity: 0.7;
    text-align: center;
    padding-bottom: 128px;
`;
