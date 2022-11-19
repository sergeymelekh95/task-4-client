import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NavBar = () => {
    return (
        <Navbar bg='primary' variant='dark'>
            <Container>
                <LinkContainer to='/dashboard'>
                    <Navbar.Brand>Dashboard</Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <LinkContainer to='/signin'>
                        <Navbar.Brand>Sign in</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to='/signup'>
                        <Navbar.Brand>Sign up</Navbar.Brand>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
};
