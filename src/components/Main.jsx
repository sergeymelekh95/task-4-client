import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { NotFound } from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Container } from 'react-bootstrap';

export const Main = () => {
    return (
        <main>
            <Container>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate to={'/signup'} replace />}
                    ></Route>
                    <Route index path='/signin' element={<SignIn />}></Route>
                    <Route index path='/signup' element={<SignUp />}></Route>
                    <Route
                        index
                        path='/dashboard'
                        element={<Dashboard />}
                    ></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </Container>
        </main>
    );
};
