import {
    MenuButtonContainer,
    MenuButtonIconsContainer,
    MenuIconContainer,
} from './style';
import { ReactComponent as HumanIcon } from './human.svg';
import { ReactComponent as CpuIcon } from './cpu.svg';

export interface MenuButtonProps {
    pvp?: boolean;
    wip?: boolean;
    onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ pvp, wip, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <MenuButtonContainer disabled={wip} onClick={handleClick}>
            <MenuButtonIconsContainer disabled={wip}>
                <MenuIconContainer>
                    <HumanIcon width={80} height={80} />
                </MenuIconContainer>

                <MenuIconContainer>vs</MenuIconContainer>

                <MenuIconContainer>
                    {pvp ? (
                        <HumanIcon width={80} height={80} />
                    ) : (
                        <CpuIcon width={70} height={70} />
                    )}
                </MenuIconContainer>
            </MenuButtonIconsContainer>
        </MenuButtonContainer>
    );
};

export default MenuButton;
