import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPieces, PieceInfo } from '../../redux/slices/piecesSlice';
import { FieldBackground } from '../FieldBackground';
import { Piece } from '../Piece';
import { FieldContainer } from './style';
import { getAvailableTiles } from '../../redux/selectors';
import {
    getSelectedPieceInfo,
    SelectedPieceInfo,
} from '../../redux/slices/gameSlice';
import { AvailableTileMarker } from '../AvailableTileMarker';

interface OwnProps {}
interface StateProps {
    pieces: Array<PieceInfo>;
    availableTiles: Array<{ x: number; y: number }> | null;
    selectedPieceInfo: SelectedPieceInfo | null;
}
interface DispatchProps {}

export type FieldProps = OwnProps & StateProps & DispatchProps;

const Field: React.FC<FieldProps> = ({
    pieces,
    availableTiles,
    selectedPieceInfo,
}) => {
    return (
        <FieldContainer>
            <FieldBackground />
            {availableTiles &&
                selectedPieceInfo &&
                availableTiles.map(({ x, y }) => (
                    <AvailableTileMarker
                        key={`${x}-${y}-${selectedPieceInfo.index}`}
                        selectedPieceInfo={selectedPieceInfo}
                        x={x}
                        y={y}
                    />
                ))}
            {pieces.map((piece, index) => (
                <Piece
                    key={`${piece.player}-${piece.type}`}
                    index={index}
                    {...piece}
                />
            ))}
        </FieldContainer>
    );
};

export default connect(
    createStructuredSelector({
        pieces: getPieces,
        availableTiles: getAvailableTiles,
        selectedPieceInfo: getSelectedPieceInfo,
    }),
    {}
)(Field);
