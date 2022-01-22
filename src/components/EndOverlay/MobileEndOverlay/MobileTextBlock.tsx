import {
    OverlayTextBlockContainer,
    OverlayTitle,
    OverlaySubtitle,
    OverlayNote,
} from './style';

export interface MobileTextBlockProps {
    title: string;
    subtitle: string;
    flipped?: boolean;
}

const MobileTextBlock: React.FC<MobileTextBlockProps> = ({
    title,
    subtitle,
    flipped,
}) => {
    return (
        <OverlayTextBlockContainer flipped={flipped}>
            <OverlayTitle>{title}</OverlayTitle>
            <OverlaySubtitle>{subtitle}</OverlaySubtitle>
            <OverlayNote>Tap the screen to play again</OverlayNote>
        </OverlayTextBlockContainer>
    );
};

export default MobileTextBlock;
