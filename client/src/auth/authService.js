import axios from 'axios'

const API_URL = 'http://localhost:5000/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// Logout user
const logout = async () => {
    localStorage.removeItem('user');
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData, {
        withCredentials: true
    });

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const authService = {
    register,
    logout,
    login
}

export default authService;