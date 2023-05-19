import * as SecureStore from 'expo-secure-store';
import { USER_DATA } from 'helpers/constants/global';

// eslint-disable-next-line consistent-return
export const getToken = async () => {
  try {
    const response = await SecureStore.getItemAsync(USER_DATA);
    return JSON.parse(response).token;
  } catch (error) {
    console.log(error);
  }
};
