import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const App = () => {
    return (
        <div className='App'>
            <Header />
            <Main />
        </div>
    );
};
