import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { FIELD_SIZE, FIELD_CONFIGURATION, TILE_COLORS } from '../../constants';
import { FieldBackgroundCanvas } from './style';

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}

export type FieldBackgroundProps = OwnProps & StateProps & DispatchProps;

const FieldBackground: React.FC<FieldBackgroundProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const { current: canvas } = canvasRef;
        const ctx = canvas?.getContext('2d');

        if (canvas && ctx) {
            FIELD_CONFIGURATION.forEach((line, y) => {
                line.forEach((tileType, x) => {
                    ctx.fillStyle = TILE_COLORS[tileType];
                    ctx.fillRect(x, y, 1, 1);
                });
            });
        }
    }, [canvasRef]);

    return (
        <FieldBackgroundCanvas
            ref={canvasRef}
            width={FIELD_SIZE}
            height={FIELD_SIZE}
        />
    );
};

export default connect(null, null)(FieldBackground);
