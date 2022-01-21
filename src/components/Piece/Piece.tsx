import { ColorType } from '../../types';
import { PieceInnerElement, PieceOuterElement } from './style';

interface OwnProps {
    player: 1 | 2;
    type: ColorType;
}

interface StateProps {
    x: number;
    y: number;
}

interface DispatchProps {}

export type PieceProps = OwnProps & StateProps & DispatchProps;

const Piece: React.FC<PieceProps> = ({ player, type, x, y }) => {
    return (
        <PieceOuterElement player={player} x={x} y={y}>
            <PieceInnerElement player={player} type={type} />
        </PieceOuterElement>
    );
};

export default Piece;
