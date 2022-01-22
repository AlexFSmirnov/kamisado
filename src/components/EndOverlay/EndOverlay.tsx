import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Player } from '../../enums/player';
import { startNewGame } from '../../redux/actions';
import {
    getCurrentPlayer,
    getWonByBlocking,
    getWonByReachingTop,
} from '../../redux/slices/gameSlice';
import {
    EndScreenContainer,
    EndScreenNote,
    EndScreenSubtitle,
    EndScreenTextContainer,
    EndScreenTitle,
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

export type EndScreenProps = OwnProps & StateProps & DispatchProps;

const EndOverlay: React.FC<EndScreenProps> = ({
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
        <EndScreenContainer active={active} onClick={startNewGame}>
            <EndScreenTextContainer>
                <EndScreenTitle>{winningPlayerName} won!</EndScreenTitle>
                {wonByBlocking && (
                    <EndScreenSubtitle>
                        The opponent can't make a move
                    </EndScreenSubtitle>
                )}
                {wonByReachingTop && (
                    <EndScreenSubtitle>
                        Their tile reached the opponent's side
                    </EndScreenSubtitle>
                )}
                <EndScreenNote>Press any key to play again</EndScreenNote>
            </EndScreenTextContainer>
        </EndScreenContainer>
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
)(EndOverlay);
