import React, { useState, useEffect } from 'react';
import NavbarComponent from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const handleSignupSuccess = () => {
        setShowSignup(false);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            {user && <NavbarComponent user={user} onLogout={handleLogout} />}
            {!user ? (
                showSignup ? (
                    <Signup
                        onSignupSuccess={handleSignupSuccess}
                        onSwitchToLogin={() => setShowSignup(false)}
                    />
                ) : (
                    <Login
                        onLoginSuccess={handleLoginSuccess}
                        onSwitchToSignup={() => setShowSignup(true)}
                    />
                )
            ) : (
                <Feed user={user} />
            )}
        </>
    );
}

export default App;
