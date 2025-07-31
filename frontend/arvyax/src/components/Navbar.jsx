import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={{ background: '#f0f0f0', padding: '1rem', marginBottom: '1rem' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>

            {token ? (
                <>
                    <Link to="/my-sessions" style={{ marginRight: '1rem' }}>My Sessions</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;