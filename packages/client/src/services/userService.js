// auth.js (service untuk autentikasi)
import api from '../config/api';

const AuthService = {
  login: async (email_or_phone, password) => {
    try {
      const response = await api.post('/auth/login', {
        email_or_phone,
        password,
      });

      if (response && response.data) {
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          return { success: true };
        } else {
          return { success: false, message: 'No token found in response' };
        }
      } else {
        return { success: false, message: 'Invalid response data' };
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return { success: false, message: error.response.data.message };
      } else {
        return {
          success: false,
          message: 'An error occurred while logging in',
        };
      }
    }
  },

  loginWithGoogle: async () => {
    try {
      const response = await api.get('/auth/google');
      if (response && response.data) {
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          return { success: true };
        } else {
          return { success: false, message: 'No token found in response' };
        }
      } else {
        return { success: false, message: 'Invalid response data' };
      }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while logging in with Google',
      };
    }
  },

  getToken: () => {
    return localStorage.getItem('token');
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default AuthService;
