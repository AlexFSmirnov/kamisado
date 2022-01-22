import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Player } from '../../../enums/player';
import { startNewGame } from '../../../redux/actions';
import {
    getCurrentPlayer,
    getWonByBlocking,
    getWonByReachingTop,
} from '../../../redux/slices/gameSlice';
import {
    OverlayContainer,
    OverlayNote,
    OverlaySubtitle,
    OverlayTextContainer,
    OverlayTitle,
} from './style';

interface OwnProps {
    active: boolean;
}
interface StateProps {
    currentPlayer: Player;
    wonByBlocking: boolean;
    wonByReachingTop: boolean;
}
interface DispatchProps {
    startNewGame: () => void;
}

export type OverlayProps = OwnProps & StateProps & DispatchProps;

const DesktopEndOverlay: React.FC<OverlayProps> = ({
    active,
    currentPlayer,
    wonByBlocking,
    wonByReachingTop,
    startNewGame,
}) => {
    useEffect(() => {
        document.addEventListener('keydown', startNewGame);
    }, [startNewGame]);

    const winningPlayerName =
        currentPlayer === Player.First ? 'Circles' : 'Squares';

    return (
        <OverlayContainer active={active} onClick={startNewGame}>
            <OverlayTextContainer>
                <OverlayTitle>{winningPlayerName} won!</OverlayTitle>
                {wonByBlocking && (
                    <OverlaySubtitle>
                        The opponent can't make a move
                    </OverlaySubtitle>
                )}
                {wonByReachingTop && (
                    <OverlaySubtitle>
                        Their tile reached the opponent's side
                    </OverlaySubtitle>
                )}
                <OverlayNote>Press any key to play again</OverlayNote>
            </OverlayTextContainer>
        </OverlayContainer>
    );
};

export default connect(
    createStructuredSelector({
        currentPlayer: getCurrentPlayer,
        wonByBlocking: getWonByBlocking,
        wonByReachingTop: getWonByReachingTop,
    }),
    {
        startNewGame,
    }
)(DesktopEndOverlay);
