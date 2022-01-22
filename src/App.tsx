import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AppScreen, getAppScreen } from './redux/slices/uiSlice';
import { Game, Menu, EndOverlay } from './components';
import { AppContainer } from './style';

interface StateProps {
    screen: AppScreen;
}

const App: React.FC<StateProps> = ({ screen }) => {
    return (
        <AppContainer>
            <Game />
            <Menu active={screen === AppScreen.Menu} />
            <EndOverlay active={screen === AppScreen.End} />
        </AppContainer>
    );
};

export default connect(
    createStructuredSelector({
        screen: getAppScreen,
    })
)(App);
