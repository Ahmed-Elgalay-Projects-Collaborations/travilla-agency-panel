import React, { createContext, useContext, useState } from 'react';

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
    return true;
  };

  const signup = async (email, password, name) => {
    // Implement actual signup logic here
    setUser({ email, name });
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