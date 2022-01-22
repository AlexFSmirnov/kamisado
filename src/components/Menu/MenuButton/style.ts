import styled from 'styled-components';

export const MenuButtonContainer = styled.div<{ disabled?: boolean }>`
    position: relative;

    width: 80%;
    max-width: 320px;
    height: 96px;
    margin-bottom: 32px;

    border: 4px solid black;
    border-radius: 16px;

    ${(props) => (props.disabled ? 'opacity: 0.3;' : '')}
`;

export const MenuButtonIconsContainer = styled.div<{ disabled?: boolean }>`
    width: 100%;
    height: 100%;
    border-radius: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: rgba(255, 255, 255, 0);
    transition: background-color 200ms;

    ${(props) =>
        props.disabled
            ? ''
            : `
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 255, 255, 0.4);
        }

        &:active {
            background-color: rgba(255, 255, 255, 0.8);
        }
    `}
`;

export const MenuIconContainer = styled.div`
    width: 92px;
    height: 92px;
    font-size: 24pt;

    display: flex;
    justify-content: center;
    align-items: center;
`;
