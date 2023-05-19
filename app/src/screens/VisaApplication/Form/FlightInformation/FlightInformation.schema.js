import moment from 'moment';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

export const useValidationSchema = () => {
  const { formatMessage } = useIntl();

  const flightInformationValidationSchema = yup.object().shape({
    // travelStartDate: yup
    //   .date()
    //   .transform(value => {
    //     return value ? moment(value).toDate() : value;
    //   })
    //   .required(
    //     formatMessage({
    //       id:
    //         'screen.visa.flightInformation.input.error.general.travelStartDate',
    //     })
    //   )
    //   .min(
    //     new Date(),
    //     formatMessage({
    //       id:
    //         'screen.visa.flightInformation.input.error.validateDate.travelStartDate',
    //     })
    //   )
    //   .typeError(
    //     formatMessage({
    //       id: 'general.invalidDateFormat',
    //     })
    //   ),
    // returnFlightDate: yup
    //   .date()
    //   .transform(value => {
    //     return value ? moment(value).toDate() : value;
    //   })
    //   .min(
    //     yup.ref('travelStartDate'),
    //     formatMessage({
    //       id:
    //         'screen.visa.flightInformation.input.error.validateDate.returnFlightDate',
    //     })
    //   )
    //   .required(
    //     formatMessage({
    //       id:
    //         'screen.visa.flightInformation.input.error.general.returnFlightDate',
    //     })
    //   )
    //   .typeError(
    //     formatMessage({
    //       id: 'general.invalidDateFormat',
    //     })
    //   ),
    cruise: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(
        formatMessage({
          id: 'screen.visa.flightInformation.input.error.general.cruise',
        })
      ),
    kindOfVisa: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(
        formatMessage({
          id: 'screen.visa.flightInformation.input.error.general.kindOfVisa',
        })
      ),
    recipientSameAsApplicant: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
        _index: yup.number().required(),
      })
      .typeError(
        formatMessage({
          id:
            'screen.visa.flightInformation.input.error.general.recipientSameAsApplicant',
        })
      ),
  });

  return { flightInformationValidationSchema };
};
