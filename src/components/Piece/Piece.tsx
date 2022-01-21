import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Player } from '../../enums/player';
import {
    getCurrentPlayer,
    getIsFirstTurn,
    setSelectedPiece,
} from '../../redux/slices/gameSlice';
import { PieceInfo } from '../../redux/slices/piecesSlice';
import { ColorType } from '../../types';
import { PieceInnerElement, PieceOuterElement } from './style';

interface OwnProps {
    player: Player;
    type: ColorType;
    x: number;
    y: number;
}

interface StateProps {
    isFirstTurn: boolean;
    currentPlayer: Player;
}

interface DispatchProps {
    setSelectedPiece: (piece: PieceInfo) => void;
}

export type PieceProps = OwnProps & StateProps & DispatchProps;

const Piece: React.FC<PieceProps> = ({
    player,
    type,
    x,
    y,
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
            player,
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
