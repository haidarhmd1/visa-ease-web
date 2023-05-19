import { useIntl } from 'react-intl';
import * as yup from 'yup';

const MobilePhoneRegex = /^(\+\d{1,3}[-\s]?)?\d{1,3}([-\s]?\d{2,5}){2,5}$/;

export const usePersonalInformation = () => {
  const { formatMessage } = useIntl();
  const schema = yup.object({
    maritalStatus: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(formatMessage({ id: 'register.form.error.maritalStatus' })),
    profession: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.profession' })),
    gender: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(formatMessage({ id: 'register.form.error.gender' })),
    phone: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.phoneNumber' }))
      .matches(
        MobilePhoneRegex,
        formatMessage({ id: 'register.form.error.phone.invalid' })
      ),
  });

  return { schema };
};
