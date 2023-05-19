import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email().required('Please provide an email'),
  password: yup.string().required('Please provide a password'),
});
