import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useForgotPasswordSchema = () => {
  const { formatMessage } = useIntl();

  const forgotPasswordSchema = yup.object({
    email: yup
      .string()
      .required(formatMessage({ id: 'login.input.email.error' }))
      .email(formatMessage({ id: 'register.form.error.email.reqValidEmail' })),
  });

  return { forgotPasswordSchema };
};
