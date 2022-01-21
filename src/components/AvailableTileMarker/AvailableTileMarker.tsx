import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Player } from '../../enums/player';
import { moveTileTo } from '../../redux/actions';
import { getCurrentPlayer } from '../../redux/slices/gameSlice';
import { PieceInfo } from '../../redux/slices/piecesSlice';
import {
    AvailableTileMarkerInnerElement,
    AvailableTileMarkerOuterElement,
} from './style';

interface OwnProps {
    x: number;
    y: number;
    selectedPieceInfo: PieceInfo;
}

interface StateProps {
    currentPlayer: Player;
}

interface DispatchProps {
    moveTileTo: (args: { x: number; y: number }) => void;
}

export type AvailableTileMarkerProps = OwnProps & StateProps & DispatchProps;

const AvailableTileMarker: React.FC<AvailableTileMarkerProps> = ({
    x,
    y,
    currentPlayer,
    selectedPieceInfo,
    moveTileTo,
}) => {
    const handleMarkerClick = () => {
        console.log('marker clicked');
        moveTileTo({ x, y });
    };

    const outerElementProps = {
        x,
        y,
        startX: selectedPieceInfo.x,
        startY: selectedPieceInfo.y,
        onClick: handleMarkerClick,
    };

    return (
        <AvailableTileMarkerOuterElement {...outerElementProps}>
            <AvailableTileMarkerInnerElement player={currentPlayer} />
        </AvailableTileMarkerOuterElement>
    );
};

export default connect(
    createStructuredSelector({
        currentPlayer: getCurrentPlayer,
    }),
    {
        moveTileTo,
    }
)(AvailableTileMarker);
