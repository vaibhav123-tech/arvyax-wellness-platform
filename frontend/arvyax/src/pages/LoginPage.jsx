import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    // CORRECTED: The function needs to accept the event 'e'
    const onChange = (e) => {
        // CORRECTED: Use a proper name like 'prevState' for the state updater
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
    e.preventDefault();
    console.log('--- Submitting Form ---');
    
    try {
      console.log('Calling authService.login...');
      const response = await authService.login(email, password);
      
      console.log('API call successful. Response:', response);

      if (response && response.token) {
        console.log('Token found. Navigating...');
        localStorage.setItem('token', response.token);
        navigate('/my-sessions');
      } else {
        console.log('Login failed. No token in response.');
        alert('Login failed: Invalid credentials or server issue.');
      }
    } catch (error) {
      console.log('--- ERROR CAUGHT ---');
      console.error('The full error object:', error);
      
      const errorMessage = error.response?.data?.msg || 'An unknown error occurred.';
      alert('Login Error: ' + errorMessage);
    }
  };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email Address</label>
                    <input
                        type="email" // Best practice to use type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password" // Added for accessibility
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={onChange} // CORRECTED: Fixed 'onchange' typo
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;