/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";


const RegisterPage = () => {
    const [formData, setFormData] = useState({
    email: "",
    password: "",
});
const { email, password } = formData;
const onChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};
const onSubmit = async (e) => {
  e.preventDefault();   
    try {
    const response = await authService.register(email, password);
    console.log('Registration successful', response.data);
  } catch (error) {
    console.error('Registration failed', error.response.data);
  }}
  return (

    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" 
          value={password}
          onChange={onChange}
          required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default RegisterPage;