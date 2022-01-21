import { connect } from 'react-redux';
import { FieldBackground } from '../FieldBackground';
import { Piece } from '../Piece';
import { FieldContainer } from './style';

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}

export type FieldProps = OwnProps & StateProps & DispatchProps;

const Field: React.FC<FieldProps> = () => {
    return (
        <FieldContainer>
            <FieldBackground />
            <Piece player={2} type={0} x={2} y={3} />
        </FieldContainer>
    );
};

export default connect(null, null)(Field);
