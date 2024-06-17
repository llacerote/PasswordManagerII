import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Register.css';
import logo from '../assets/logo.png'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, passwordHash: password }),
        });

        if (response.ok) {
            setMessage('User registered successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            const error = await response.text();
            setMessage(`Error: ${error}`);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <img src={logo} alt="Logo" className="logo" />
            <h1>PassWordManager</h1>
            <div className="card p-4 mt-4">
                <h2 className="mb-4">Register</h2>
                <form onSubmit={handleRegister}>
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
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                {message && <p className="text-success mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default Register;
