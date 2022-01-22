import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AppScreen, getAppScreen } from './redux/slices/uiSlice';
import { Game } from './components';
import { EndOverlay } from './components';
import { AppContainer } from './style';

interface StateProps {
    screen: AppScreen;
}

const App: React.FC<StateProps> = ({ screen }) => {
    return (
        <AppContainer>
            <Game />
            <EndOverlay active={screen === AppScreen.End} />
        </AppContainer>
    );
};

export default connect(
    createStructuredSelector({
        screen: getAppScreen,
    })
)(App);
