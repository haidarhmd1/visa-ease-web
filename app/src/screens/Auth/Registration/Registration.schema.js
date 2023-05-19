import { useIntl } from 'react-intl';
import * as yup from 'yup';

const MobilePhoneRegex = /^(\+\d{1,3}[-\s]?)?\d{1,3}([-\s]?\d{2,5}){2,5}$/;

export const useRegistrationValidationSchema = () => {
  const { formatMessage } = useIntl();
  const registrationValidationSchema = yup.object({
    fullname: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.fullname' })),
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
    // dob: yup
    //   .string()
    //   .required(formatMessage({ id: 'register.form.error.dob' }))
    //   .matches(
    //     /^\d{2}\/\d{2}\/\d{4}$/,
    //     formatMessage({ id: 'register.input.dob.error.invalid' })
    //   ),
    password: yup
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
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        formatMessage({ id: 'register.form.error.passwordConfirmation' })
      ),
    gender: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(formatMessage({ id: 'register.form.error.gender' })),
    nationality: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(formatMessage({ id: 'register.form.error.nationality' })),

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
    email: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.email' }))
      .email(formatMessage({ id: 'register.form.error.email.reqValidEmail' })),
    phone: yup
      .string()
      .required(formatMessage({ id: 'register.form.error.phoneNumber' }))
      .matches(
        MobilePhoneRegex,
        formatMessage({ id: 'register.form.error.phone.invalid' })
      ),
  });

  return { registrationValidationSchema };
};
