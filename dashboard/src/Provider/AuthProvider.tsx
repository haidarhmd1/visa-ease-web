// AuthProvider.tsx

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginUser } from '../models/interfaces';
import { toast } from 'react-hot-toast';
import { userLogin } from '../services/api';
import axios from 'axios';

type AuthContextType = {
  token: string | null;
  // user: IUserData | null;
  isAuthenticated: boolean;
  login: (values: ILoginUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  // user: null,
  isAuthenticated: false,
  login: () => {
    return;
  },
  logout: () => {
    return;
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  );
  // const [user, setUser] = useState<IUserData | null>(null);
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user data on initial load if token exists
      // fetchUserData();
    }
  }, [token]);

  // const fetchUserData = async () => {
  //   try {
  //     const response: any = getMe();
  //     const user = response.data;
  //     setUser(user);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error, e.g., display error message or redirect to login
  //     logout();
  //   }
  // };

  const login = async (values: ILoginUser) => {
    try {
      const response: any = await userLogin(values);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // await fetchUserData();
      toast('Logged In!');
      navigate('/overview'); // Redirect to dashboard after successful login
    } catch (error: unknown) {
      console.error(error);
      toast.error('error');
    }
  };

  const logout = () => {
    setToken(null);
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
    // setUser(null);
    navigate('/login'); // Redirect to login page after logout
  };

  const authState: AuthContextType = {
    token,
    // user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
