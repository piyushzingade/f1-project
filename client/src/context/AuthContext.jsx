import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BACKENDURL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext - Initializing with token:", localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      axios.get(`${BACKENDURL}/auth/verify`, {
        headers: { token }
      })
      .then(response => {
        console.log("AuthContext - Token verified, user data:", response.data.user);
        setUser(response.data.user);
        // Fetch user's portfolio if it exists
        return axios.get(`${BACKENDURL}/portfolios/user/${response.data.user._id}`);
      })
      .then(response => {
        console.log("AuthContext - Portfolio data:", response.data);
        if (response.data) {
          setPortfolio(response.data);
        }
      })
      .catch(error => {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      console.log("AuthContext - No token found");
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    console.log("AuthContext - Login attempt with:", email);
    try {
      const response = await axios.post(`${BACKENDURL}/auth/login`, { email, password });
      const { token, user } = response.data;
      console.log("AuthContext - Login successful, user:", user);
      localStorage.setItem('token', token);
      setUser(user);
      
      // Fetch user's portfolio
      try {
        const portfolioResponse = await axios.get(`${BACKENDURL}/portfolios/user/${user._id}`);
        console.log("AuthContext - Portfolio data after login:", portfolioResponse.data);
        if (portfolioResponse.data) {
          setPortfolio(portfolioResponse.data);
        }
      } catch (portfolioError) {
        console.log("AuthContext - No portfolio found for user");
        // This is expected if the user doesn't have a portfolio yet
      }
      
      return { success: true };
    } catch (error) {
      console.error("AuthContext - Login failed:", error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const logout = () => {
    console.log("AuthContext - Logging out");
    localStorage.removeItem('token');
    setUser(null);
    setPortfolio(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      portfolio, 
      loading, 
      login, 
      logout,
      setPortfolio 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 