import styled from 'styled-components';

export const MenuContainer = styled.div<{ active: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 1)
    );

    opacity: ${(props) => (props.active ? 1 : 0)};
    ${(props) => (props.active ? '' : 'pointer-events: none;')}
    transition: opacity 300ms;
`;

export const Title = styled.h1`
    font-size: 48pt;
    padding-bottom: 64px;

    @media (max-width: 320px) {
        font-size: 40px;
    }
`;
