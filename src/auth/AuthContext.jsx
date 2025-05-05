import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Ensure you have your API URL set in .env file

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Implement actual login logic here
    setUser({ email, name: 'John Smith' });

    // Simulate a successful login
    axios.post(API_URL+'/login', { email, password })
      .then((response) => {
        if (response.status === 200) {
          setUser({ email, name: response.data.name });
        } else {
          throw new Error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
    return true;
  };

  const signup = async (email, password, name) => {
    // Implement actual signup logic here
    const response = axios.post(API_URL+'/register', { email, password, name, 'role': 'agency' })
      .then((response) => {
        if (response.status === 201) {
          setUser({ email, name });
        } else {
          throw new Error('Signup failed');
        }
      })
      .catch((error) => {
        console.log('API_URL', API_URL);
        console.error('Signup error:', error);
        throw error;
      });

      if (response.status === 201) {
        setUser({ email, name });
      }
      else {
        throw new Error('Signup failed');
      }
  };

  const logout = () => {
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};