import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

/**
 * NAVBAR COMPONENT
 * Displays top navigation bar with user info and logout button
 * - Shows user's username (from localStorage)
 * - Provides logout functionality
 * - Sticky positioning at top of page
 * Props:
 *   - user: Current logged-in user object
 *   - onLogout: Callback function for logout
 */
function NavbarComponent({ user, onLogout }) {
    return (
        <Navbar className="navbar-custom" sticky="top">
            <Container>
                <Navbar.Brand href="#" style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>
                    🌐 3W Social
                </Navbar.Brand>
                <Nav className="ms-auto" style={{ alignItems: 'center' }}>
                    {user && (
                        <>
                            <span style={{ color: 'white', marginRight: '20px' }}>
                                Hi, <strong>{user.username}</strong>
                            </span>
                            <Button
                                variant="light"
                                size="sm"
                                onClick={onLogout}
                                style={{ cursor: 'pointer' }}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
