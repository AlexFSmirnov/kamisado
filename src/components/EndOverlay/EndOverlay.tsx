import { DesktopEndOverlay } from './DesktopEndOverlay';
import { MobileEndOverlay } from './MobileEndOverlay';

interface EndOverlayProps {
    active: boolean;
}

const EndOverlay: React.FC<EndOverlayProps> = (props) => {
    const isMobile = 'ontouchstart' in document.documentElement;

    return isMobile ? (
        <MobileEndOverlay {...props} />
    ) : (
        <DesktopEndOverlay {...props} />
    );
};

export default EndOverlay;
