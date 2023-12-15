import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users?username=${username}`
            );

            if (response.ok) {
                const users = await response.json();

                if (users.length > 0 && password === users[0].email) {
                    navigate('/feeds');
                } else {
                    setLoginError('Invalid credentials. Please try again.');
                }
            } else {
                console.error('Error fetching user information');
            }
        } catch (error) {
            console.error(`Error during login: ${error.message}`);
        }
    };

    return (
        <div className="split-screen">
            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Log in</h2>
                    <p className="login-subtitle">Welcome back! Log in to your account.</p>
                    <div className="login-form">
                        <label className="login-label">
                            <span>Username:</span>
                            <input
                                className="login-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="login-label">
                            <span>Password:</span>
                            <input
                                className="login-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <button className="login-button" onClick={handleLogin}>
                        Log in
                    </button>
                    {loginError && <p className="login-error-message">{loginError}</p>}
                </div>
            </div>
            <div className="image-container">
                <img
                    src = "https://i.pinimg.com/564x/15/f2/56/15f25674f4e31ee7cfccaf930860fc04.jpg"
                    alt="Background"
                    className="background-image"
                />
            </div>
        </div>
    );
};

export default Login;
