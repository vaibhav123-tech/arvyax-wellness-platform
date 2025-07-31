import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authService.login(email, password);
            if (response.token) {
                localStorage.setItem('token', response.token);
                navigate('/my-sessions');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed. Please try again.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginWrapper}>
                {/* Left Column: Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Welcome Back</h2>
                    
                    {error && <p className={styles.error}>{error}</p>}
                    
                    <form onSubmit={onSubmit}>
                        <div className={styles.formLabel}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className={styles.formInput}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className={styles.formLabel}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className={styles.formInput}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Sign In
                        </button>
                    </form>
                    <p className={styles.linkText}>
                        Don't have an account?{' '}
                        <Link to="/register" className={styles.link}>
                            Sign Up
                        </Link>
                    </p>
                </div>

                {/* Right Column: Image */}
                <div className={styles.imageContainer}>
                    {/* The image is a background, so this div is empty */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;