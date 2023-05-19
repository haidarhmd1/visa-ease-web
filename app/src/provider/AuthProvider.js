import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { userLogin } from 'services/api';
import { useMutation, useQueryClient } from 'react-query';
import { USER_DATA } from 'helpers/constants/global';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  const [userData, setUserData] = useState(null);

  const {
    mutate,
    isLoading: isLoginLoading,
    error: loginError,
    isError: IsLoginError,
  } = useMutation(userLogin, {
    onSuccess: async data => {
      try {
        setAuthToken(data.data.token);
        setIsAuthenticated(true);
        axios.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
        await SecureStore.setItemAsync(USER_DATA, data.data.token);
      } catch (error) {
        console.error(error);
      }
    },
    onError: error => {
      if (
        error?.response.data.message ===
        'You must confirm your email in order to sign in'
      ) {
        setIsEmailConfirmed(false);
      }
    },
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(USER_DATA);
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setAuthToken(token);
        setIsAuthenticated(true);
      }
    };
    loadToken();
  }, []);

  const login = useCallback(
    data => {
      mutate(data);
    },
    [mutate]
  );

  const logout = useCallback(async () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserData(null);
    axios.defaults.headers.common.Authorization = '';
    await SecureStore.deleteItemAsync(USER_DATA);
    queryClient.invalidateQueries();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      authToken,
      login,
      logout,
      userData,
      setUserData,
      isLoginLoading,
      IsLoginError,
      loginError,
      isEmailConfirmed,
      setIsEmailConfirmed,
    }),
    [
      isAuthenticated,
      authToken,
      login,
      logout,
      userData,
      isLoginLoading,
      IsLoginError,
      loginError,
      isEmailConfirmed,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
