import { connect } from 'react-redux';
import { AppScreen, setScreen } from '../../redux/slices/uiSlice';
import { MenuButton } from './MenuButton';
import { MenuContainer, Title } from './style';

interface OwnProps {
    active: boolean;
}
interface StateProps {}
interface DispatchProps {
    setScreen: (screen: AppScreen) => void;
}

export type MenuProps = OwnProps & StateProps & DispatchProps;

const Menu: React.FC<MenuProps> = ({ active, setScreen }) => {
    const handlePvPButtonClick = () => {
        setScreen(AppScreen.Game);
    };

    return (
        <MenuContainer active={active}>
            <Title>Kamisado</Title>
            <MenuButton pvp onClick={handlePvPButtonClick} />
            <MenuButton wip />
        </MenuContainer>
    );
};

export default connect(null, {
    setScreen,
})(Menu);
