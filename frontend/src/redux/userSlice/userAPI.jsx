import axios from 'axios';

const API_URL_LOGIN = 'http://localhost:5000/login';
const API_URL_REGISTER = 'http://localhost:5000/register';


const login = async (credentials) => {
    const response = await axios.post( API_URL_LOGIN, credentials);
    localStorage.setItem('token', response.data.token);
    return response;
};

const register = async (userData) => {
    const response = await axios.post(`${API_URL_REGISTER}/new-user`, userData);
    return response;
};

const userAPI = { login, register };

export default userAPI;