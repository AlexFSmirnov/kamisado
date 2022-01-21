import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    getCurrentPlayer,
    SelectedPieceInfo,
} from '../../redux/slices/gameSlice';
import {
    AvailableTileMarkerInnerElement,
    AvailableTileMarkerOuterElement,
} from './style';

interface OwnProps {
    x: number;
    y: number;
    selectedPieceInfo: SelectedPieceInfo;
}

interface StateProps {
    currentPlayer: 1 | 2;
}

export type AvailableTileMarkerProps = OwnProps & StateProps;

const AvailableTileMarker: React.FC<AvailableTileMarkerProps> = ({
    x,
    y,
    currentPlayer,
    selectedPieceInfo,
}) => {
    const outerElementProps = {
        x,
        y,
        startX: selectedPieceInfo.x,
        startY: selectedPieceInfo.y,
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
    })
)(AvailableTileMarker);
