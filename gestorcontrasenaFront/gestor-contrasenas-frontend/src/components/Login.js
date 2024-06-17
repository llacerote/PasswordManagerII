import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Login.css';
import logo from '../assets/logo.png'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, passwordHash: password }),
        });

        if (response.ok) {
            const user = await response.json();
            login(user);
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5 text-center">
            <img src={logo} alt="Logo" className="logo" />
            <h1>PassWordManager</h1>
            <div className="card p-4 mt-4">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">Login</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/register')}>Register</button>
                </form>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
