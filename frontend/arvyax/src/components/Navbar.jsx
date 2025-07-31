import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.navContent}>
                <Link to="/" className={styles.navBrand}>Arvyax</Link>
                <div className={styles.navLinks}>
                    {token ? (
                        <>
                            <Link to="/my-sessions" className={styles.actionLink}>My Sessions</Link>
                            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;