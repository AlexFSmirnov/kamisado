import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPiecesList, PieceInfo } from '../../redux/slices/piecesSlice';
import { FieldBackground } from '../FieldBackground';
import { getAvailableTiles } from '../../redux/selectors';
import { getSelectedPieceInfo } from '../../redux/slices/gameSlice';
import { AvailableTileMarker } from '../AvailableTileMarker';
import { Piece } from '../Piece';
import { FieldContainer } from './style';

interface OwnProps {}
interface StateProps {
    pieces: Array<PieceInfo>;
    availableTiles: Array<{ x: number; y: number }> | null;
    selectedPieceInfo: PieceInfo | null;
}
interface DispatchProps {}

export type FieldProps = OwnProps & StateProps & DispatchProps;

const Field: React.FC<FieldProps> = ({
    pieces,
    availableTiles,
    selectedPieceInfo,
}) => {
    console.log({ pieces, availableTiles, selectedPieceInfo });

    return (
        <FieldContainer>
            <FieldBackground />
            {availableTiles &&
                selectedPieceInfo &&
                availableTiles.map(({ x, y }) => (
                    <AvailableTileMarker
                        key={`${x}-${y}-${selectedPieceInfo.type}-${selectedPieceInfo.player}`}
                        selectedPieceInfo={selectedPieceInfo}
                        x={x}
                        y={y}
                    />
                ))}
            {pieces.map((piece) => (
                <Piece key={`${piece.player}-${piece.type}`} {...piece} />
            ))}
        </FieldContainer>
    );
};

export default connect(
    createStructuredSelector({
        pieces: getPiecesList,
        availableTiles: getAvailableTiles,
        selectedPieceInfo: getSelectedPieceInfo,
    }),
    {}
)(Field);
