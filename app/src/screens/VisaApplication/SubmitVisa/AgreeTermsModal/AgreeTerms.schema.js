import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useAgreeTermsSchema = () => {
  const { formatMessage } = useIntl();

  const schema = yup.object().shape({
    place: yup
      .string()
      .required(formatMessage({ id: 'general.form.input.text.validation' })),
  });

  return { schema };
};
