import React, { createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);

  const login = (username, id, userRole = 'user') => {
    setUser({ username});
    setId({ id });
    setRole(userRole);
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
  };

  const isLoggedIn = () => {
    return !!user;
  }

  const isAdmin = () => {
    return role === 'admin';
  }

  return (
    <AuthContext.Provider value={{ user, id, role, login, logout, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};