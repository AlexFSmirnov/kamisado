import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getFieldTest, setTest } from './redux/fieldSlice';

const App = ({ test, setTest }: any) => {
    return (
        <div>
            <div>{test}</div>
            <button onClick={() => setTest(5)} />
        </div>
    );
};

export default connect(
    createStructuredSelector({
        test: getFieldTest,
    }),
    {
        setTest,
    }
)(App);
