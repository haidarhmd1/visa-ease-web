import axios, { AxiosRequestConfig } from 'axios';
import { ILoginUser, IRegisterUser, IUpdateUser } from '../models/interfaces';

export const BASE_URL = 'http://localhost:3000';

const headers: AxiosRequestConfig['headers'] = {
  'Content-Type': 'application/json',
};

export const axiosConfig = () => {
  return {
    headers: { ...headers },
  };
};

export const axiosDocumentConfig = () => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  };
};

// USER
export const userLogin = (data: ILoginUser) =>
  axios.post(`${BASE_URL}/v1/dashboard/login`, data, { headers });

export const registerUserProfile = (data: IRegisterUser) => {
  return axios.post(`${BASE_URL}/v1/dashboard/register`, data, { headers });
};

export const getMe = () => {
  return axios.get(`${BASE_URL}/v1/dashboard/getMe`, axiosConfig());
};

// VISA
export const getAllVisas = () =>
  axios.get(`${BASE_URL}/v1/dashboard/visa-application/getAll`);

export const getSingleVisaUser = (id: string) => {
  return axios.get(`${BASE_URL}/v1/dashboard/user/${id}`, axiosConfig());
};

export const getAllVisaApplicationsbyUser = (id: string | undefined) =>
  axios.get(
    `${BASE_URL}/v1/dashboard/visa-application/getAllVisaApplicationsByUser/${id}`
  );

export const getAllUsers = () =>
  axios.get(`${BASE_URL}/v1/dashboard/getAllUsers`);

export const updateUser = (data: IUpdateUser) =>
  axios.put(`${BASE_URL}/v1/dashboard/user`, data, axiosConfig());

export const deleteUser = (id: string) =>
  axios.delete(`${BASE_URL}/v1/dashboard/user/delete/${id}`, axiosConfig());
