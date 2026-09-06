import React, { useState } from 'react';
import { login } from '../api';

function Login({ onLoginSuccess, onSwitchToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(email, password);
            onLoginSuccess(response.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>🌐 3W Social</h2>
                <h4 style={{ textAlign: 'center', color: '#667eea', marginBottom: '30px', fontSize: '18px' }}>
                    Welcome Back!
                </h4>

                {error && <div className="error-message">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* <div className="auth-link">
                    Don't have an account? <a onClick={onSwitchToSignup}>Sign up here</a>
                </div> */}


                <div className="auth-link">
                    Don't have an account?{' '}
                    <button type="button" className="link-button" onClick={onSwitchToSignup}>
                        Sign up here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
