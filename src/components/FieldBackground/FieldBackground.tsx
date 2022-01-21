import { connect } from 'react-redux';
import { FieldBackgroundCanvas } from './style';

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}

export type FieldBackgroundProps = OwnProps & StateProps & DispatchProps;

const FieldBackground: React.FC<FieldBackgroundProps> = () => {
    return <FieldBackgroundCanvas />;
};

export default connect(null, null)(FieldBackground);
