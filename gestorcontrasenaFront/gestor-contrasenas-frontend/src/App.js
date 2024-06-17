import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <div className="container mt-5">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </AuthProvider>
    );
};

export default App;
