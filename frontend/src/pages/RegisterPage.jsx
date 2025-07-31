import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import styles from './RegisterPage.module.css'; // Import the new CSS module

const RegisterPage = () => {
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
            await authService.register(email, password);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.registerWrapper}>
                {/* Left Column: Form */}
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Create Your Account</h2>
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
                                placeholder="Choose a strong password"
                                required
                                minLength="6"
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            Sign Up
                        </button>
                    </form>
                    <p className={styles.linkText}>
                        Already have an account?{' '}
                        <Link to="/login" className={styles.link}>
                            Log In
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

export default RegisterPage;