```javascript
import axios from 'axios';
import { api_keys } from '../../config/api_keys';

const API_URL = 'https://elysiumos-backend.example.com/api/auth/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data.authToken) {
    localStorage.setItem('authToken', JSON.stringify(response.data.authToken));
  }
  return response.data;
};

const login = async (userCredentials) => {
  const response = await axios.post(API_URL + 'login', userCredentials);
  if (response.data.authToken) {
    localStorage.setItem('authToken', JSON.stringify(response.data.authToken));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('authToken');
};

const getCurrentUser = () => {
  const authToken = JSON.parse(localStorage.getItem('authToken'));
  if (authToken) {
    const user = jwtDecode(authToken);
    return user;
  }
  return null;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
```