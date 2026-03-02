import React, { createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

  const login = (username, id) => {
    setUser({ username});
    setId({ id });
  };

  const logout = async () => {
    setUser(null);
  };

  const isLoggedIn = () => {
    return !!user;
  }

  return (
    <AuthContext.Provider value={{ user, id, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};