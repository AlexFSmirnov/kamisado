import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { State } from '../../redux/store';
import { getPieces, PieceInfo } from '../../redux/piecesSlice';
import { FieldBackground } from '../FieldBackground';
import { Piece } from '../Piece';
import { FieldContainer } from './style';

interface OwnProps {}
interface StateProps {
    pieces: Array<PieceInfo>;
}
interface DispatchProps {}

export type FieldProps = OwnProps & StateProps & DispatchProps;

const Field: React.FC<FieldProps> = ({ pieces }) => {
    return (
        <FieldContainer>
            <FieldBackground />
            {pieces.map((piece) => (
                <Piece {...piece} />
            ))}
        </FieldContainer>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    createStructuredSelector({
        pieces: getPieces,
    }),
    {}
)(Field);
