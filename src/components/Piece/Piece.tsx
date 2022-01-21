import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    getCurrentPlayer,
    getIsFirstTurn,
    SelectedPieceInfo,
    setSelectedPiece,
} from '../../redux/slices/gameSlice';
import { ColorType } from '../../types';
import { PieceInnerElement, PieceOuterElement } from './style';

interface OwnProps {
    player: 1 | 2;
    type: ColorType;
    x: number;
    y: number;
    index: number;
}

interface StateProps {
    isFirstTurn: boolean;
    currentPlayer: 1 | 2;
}

interface DispatchProps {
    setSelectedPiece: (piece: SelectedPieceInfo) => void;
}

export type PieceProps = OwnProps & StateProps & DispatchProps;

const Piece: React.FC<PieceProps> = ({
    player,
    type,
    x,
    y,
    index,
    isFirstTurn,
    currentPlayer,
    setSelectedPiece,
}) => {
    const isInteractive = isFirstTurn && player === currentPlayer;

    const handleTileClick = () => {
        if (!isInteractive) {
            return;
        }

        setSelectedPiece({
            index,
            type,
            x,
            y,
        });
    };

    return (
        <PieceOuterElement
            player={player}
            x={x}
            y={y}
            interactive={isInteractive}
            onClick={handleTileClick}
        >
            <PieceInnerElement player={player} type={type} />
        </PieceOuterElement>
    );
};

export default connect(
    createStructuredSelector({
        isFirstTurn: getIsFirstTurn,
        currentPlayer: getCurrentPlayer,
    }),
    {
        setSelectedPiece,
    }
)(Piece);
