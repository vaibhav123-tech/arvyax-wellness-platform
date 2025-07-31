/* eslint-disable no-unused-vars */
import axios from 'axios';
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/`;
const register =(email,password) => {
    return axios.post(API_URL + 'register', {
        email,
        password
    });
    }
    const login = async (email, password) => {
    const response=await axios.post(API_URL + 'login', {
    email,
    password,
  });
  return response.data;
}
const authService = {
  register,
  login,
};

export default authService;
// Register user
