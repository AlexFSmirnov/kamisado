import { connect } from 'react-redux';
import { FieldBackground } from '../FieldBackground';

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}

export type FieldProps = OwnProps & StateProps & DispatchProps;

const Field: React.FC<FieldProps> = () => {
    return <FieldBackground />;
};

export default connect(null, null)(Field);
