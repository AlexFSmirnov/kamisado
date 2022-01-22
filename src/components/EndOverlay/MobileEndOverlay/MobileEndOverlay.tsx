import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Player } from '../../../enums/player';
import { startNewGame } from '../../../redux/actions';
import {
    getCurrentPlayer,
    getWonByBlocking,
    getWonByReachingTop,
} from '../../../redux/slices/gameSlice';
import MobileTextBlock from './MobileTextBlock';
import { OverlayContainer, OverlayTextContainer } from './style';

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

const wonTitle = 'You won!';
const lostTitle = 'You lost';
const wonByBlockingSubtitle = "The opponent can't make a move";
const lostByBlockingSubtitle = "You can't make a move";
const wonByReachingTopSubtitle = "Your tile reached the opponent's side";
const lostByReachingTopSubtitle = "The opponent's tile reached your side";

const MobileEndOverlay: React.FC<OverlayProps> = ({
    active,
    currentPlayer,
    wonByBlocking,
    wonByReachingTop,
    startNewGame,
}) => {
    const wonSubtitle = wonByBlocking
        ? wonByBlockingSubtitle
        : wonByReachingTopSubtitle;
    const lostSubtitle = wonByBlocking
        ? lostByBlockingSubtitle
        : lostByReachingTopSubtitle;

    return (
        <OverlayContainer active={active} onClick={startNewGame}>
            <OverlayTextContainer>
                <MobileTextBlock
                    flipped
                    title={
                        currentPlayer === Player.Second ? wonTitle : lostTitle
                    }
                    subtitle={
                        currentPlayer === Player.Second
                            ? wonSubtitle
                            : lostSubtitle
                    }
                />
                <MobileTextBlock
                    title={
                        currentPlayer === Player.First ? wonTitle : lostTitle
                    }
                    subtitle={
                        currentPlayer === Player.First
                            ? wonSubtitle
                            : lostSubtitle
                    }
                />
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
)(MobileEndOverlay);
