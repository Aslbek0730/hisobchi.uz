import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

const getStoredUser = () => {
  const raw = localStorage.getItem('hisobchi_user');
  return raw ? JSON.parse(raw) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hisobchi_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem('hisobchi_user', JSON.stringify(res.data.user));
      })
      .catch(() => {
        localStorage.removeItem('hisobchi_token');
        localStorage.removeItem('hisobchi_user');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('hisobchi_token', data.token);
    localStorage.setItem('hisobchi_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('hisobchi_token', data.token);
    localStorage.setItem('hisobchi_user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('hisobchi_token');
    localStorage.removeItem('hisobchi_user');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
