import { useState, useEffect } from 'react';
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
    startNewGame,
}) => {
    const [winningPlayer, setWinningPlayer] = useState(currentPlayer);
    const [persistentWonByBlocking, setPersistentWonByBlocking] =
        useState(wonByBlocking);

    useEffect(() => {
        if (active) {
            setWinningPlayer(currentPlayer);
            setPersistentWonByBlocking(wonByBlocking);
        }
    }, [
        active,
        currentPlayer,
        wonByBlocking,
        setWinningPlayer,
        setPersistentWonByBlocking,
    ]);

    const wonSubtitle = persistentWonByBlocking
        ? wonByBlockingSubtitle
        : wonByReachingTopSubtitle;
    const lostSubtitle = persistentWonByBlocking
        ? lostByBlockingSubtitle
        : lostByReachingTopSubtitle;

    return (
        <OverlayContainer active={active} onClick={startNewGame}>
            <OverlayTextContainer>
                <MobileTextBlock
                    flipped
                    title={
                        winningPlayer === Player.Second ? wonTitle : lostTitle
                    }
                    subtitle={
                        winningPlayer === Player.Second
                            ? wonSubtitle
                            : lostSubtitle
                    }
                />
                <MobileTextBlock
                    title={
                        winningPlayer === Player.First ? wonTitle : lostTitle
                    }
                    subtitle={
                        winningPlayer === Player.First
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
