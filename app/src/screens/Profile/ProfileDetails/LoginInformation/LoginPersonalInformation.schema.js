import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useLoginInformation = () => {
  const { formatMessage } = useIntl();
  const schema = yup.object({
    newPassword: yup
      .string()
      .min(8, formatMessage({ id: 'register.form.error.password.full' }))
      .matches(
        /[0-9]/,
        formatMessage({ id: 'register.form.error.password.reqNumber' })
      )
      .matches(
        /[a-z]/,
        formatMessage({ id: 'register.form.error.password.reqLowerCase' })
      )
      .matches(
        /[A-Z]/,
        formatMessage({ id: 'register.form.error.password.reqUpperCase' })
      )
      .matches(
        /[^\w]/,
        formatMessage({ id: 'register.form.error.password.reqSymbol' })
      ),
  });

  return { schema };
};
