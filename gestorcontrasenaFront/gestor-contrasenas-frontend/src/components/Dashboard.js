import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png'; 

const Dashboard = () => {
    const [passwords, setPasswords] = useState([]);
    const [length, setLength] = useState(12);
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSpecial, setUseSpecial] = useState(true);
    const [service, setService] = useState('');
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user) {
            const fetchPasswords = async () => {
                const response = await fetch(`/passwords/user/${user.username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (Array.isArray(data)) {
                    setPasswords(data);
                } else {
                    setPasswords([]);
                }
            };

            fetchPasswords();
        }
    }, [user]);

    const generatePassword = async () => {
        const response = await fetch(`/passwords/generate?length=${length}&useUpper=${useUpper}&useLower=${useLower}&useDigits=${useDigits}&useSpecial=${useSpecial}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const generatedPassword = await response.text();

        await savePassword(generatedPassword);
    };

    const savePassword = async (password) => {
        if (user) {
            const response = await fetch(`/passwords/save?username=${user.username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, service }),
            });

            const newPassword = await response.json();
            setPasswords([...passwords, newPassword]);
        }
    };

    const deletePassword = async (id) => {
        await fetch(`/passwords/delete/${id}`, {
            method: 'DELETE',
        });

        setPasswords(passwords.filter(password => password.id !== id));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5 text-center">
            <img src={logo} alt="Logo" className="logo" />
            <h1>PassWordManager</h1>
            <button className="btn btn-primary mb-3 logout-button" onClick={logout}>Logout</button>
            <div className="card p-4">
                <h2 className="mb-4">Generate Password</h2>
                <div className="form-group">
                    <label>Length:</label>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="form-control" />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
                    <label className="form-check-label">Use Uppercase</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
                    <label className="form-check-label">Use Lowercase</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} />
                    <label className="form-check-label">Use Digits</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={useSpecial} onChange={(e) => setUseSpecial(e.target.checked)} />
                    <label className="form-check-label">Use Special Characters</label>
                </div>
                <div className="form-group">
                    <label>Service:</label>
                    <input type="text" value={service} onChange={(e) => setService(e.target.value)} className="form-control" />
                </div>
                <button onClick={generatePassword} className="btn btn-primary btn-generate">Generate</button>

                <h2 className="mt-4">Stored Passwords</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Password</th>
                            <th>Service</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passwords.map((password) => (
                            <tr key={password.id}>
                                <td>{password.password}</td>
                                <td>{password.service}</td>
                                <td>
                                    <button onClick={() => deletePassword(password.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
