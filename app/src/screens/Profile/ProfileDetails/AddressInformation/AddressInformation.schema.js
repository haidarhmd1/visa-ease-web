import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useAddressInformation = () => {
  const { formatMessage } = useIntl();
  const schema = yup.object({
    country: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(formatMessage({ id: 'register.form.error.country' })),
    city: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(formatMessage({ id: 'register.form.error.city' })),
    zipCode: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.zipCode' })),
    street: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.street' })),
  });

  return { schema };
};
