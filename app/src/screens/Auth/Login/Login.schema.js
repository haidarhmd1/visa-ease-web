import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useLoginSchema = () => {
  const { formatMessage } = useIntl();

  const loginSchema = yup.object({
    email: yup
      .string()
      .required(formatMessage({ id: 'login.input.email.error' }))
      .email(formatMessage({ id: 'register.form.error.email.reqValidEmail' })),
    password: yup
      .string()
      .required(formatMessage({ id: 'login.input.password.error' })),
  });

  return { loginSchema };
};
