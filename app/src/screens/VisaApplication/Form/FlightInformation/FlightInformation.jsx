import React, { useEffect } from 'react';

import { Spacer, Wrapper } from 'components/Layout/Layout';
import { PrimaryButton } from 'components/Buttons';
import { Card, Text } from 'react-native-paper';
import { AppHeader } from 'components/AppHeader';
import { Alert, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CustomDatePicker,
  CustomDropdown,
  CustomTextInput,
} from 'components/CustomFormElements/CustomFormElements';
import { useIntl } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { setFlightInformation } from 'services/api';
import moment from 'moment';
import { useValidationSchema } from './FlightInformation.schema';

export const FlightInformation = ({ route, navigation }) => {
  const { visaId, item } = route.params;
  const { flightInformationValidationSchema } = useValidationSchema();
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: data => setFlightInformation(visaId, data),
    onSuccess: () => {
      queryClient.invalidateQueries('getSingleVisaApplication');
      navigation.goBack();
    },
    onError: () => {
      return Alert.alert(
        'Error',
        formatMessage({ id: 'general.error.message' }),
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    },
  });

  const defaultValues = {
    travelStartDate: item?.expectedTravelStartDate
      ? moment(item?.expectedTravelStartDate).toDate()
      : moment().toDate(),
    returnFlightDate: item?.expectedReturnFlightDate
      ? moment(item?.expectedReturnFlightDate).toDate()
      : moment().toDate(),
    cruise: item?.cruise ?? '',
    recipientSameAsApplicant: item?.invoiceRecipientSameAsApplicant || '',
    invoiceAddress: item?.additionalAddress || '',
    kindOfVisa: item?.kindOfTrip || '',
  };

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues,
    resolver: yupResolver(flightInformationValidationSchema),
  });

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = values => {
    mutate(values);
  };

  return (
    <>
      <AppHeader
        goBack={() => navigation.goBack()}
        title={formatMessage({ id: 'screen.visa.flightInformation.title' })}
      />
      <View style={{ flex: 1, position: 'relative' }}>
        <ScrollView
          style={{
            backgroundColor: 'white',
          }}
        >
          <Wrapper>
            <View>
              <CustomDatePicker
                control={control}
                name="travelStartDate"
                placeholder={formatMessage({
                  id:
                    'screen.visa.flightInformation.input.placeholder.travelStartDate',
                })}
              />
              <Spacer />
              <CustomDatePicker
                control={control}
                name="returnFlightDate"
                placeholder={formatMessage({
                  id:
                    'screen.visa.flightInformation.input.placeholder.returnFlightDate',
                })}
              />
              <Spacer />
              <Text variant="labelMedium">
                {formatMessage({
                  id: 'screen.visa.flightInformation.input.placeholder.cruise',
                })}
              </Text>
              <CustomDropdown
                name="cruise"
                rules={{ required: true }}
                control={control}
                selectPlaceholder={formatMessage({
                  id: 'screen.visa.flightInformation.input.placeholder.cruise',
                })}
                search={false}
                data={[
                  {
                    label: formatMessage({
                      id: 'general.yes',
                    }),
                    value: true,
                  },
                  {
                    label: formatMessage({
                      id: 'general.no',
                    }),
                    value: false,
                  },
                ]}
              />
              <Spacer />
              <Text variant="labelMedium">
                {formatMessage({
                  id:
                    'screen.visa.flightInformation.input.placeholder.kindOfVisa',
                })}
              </Text>
              <CustomDropdown
                name="kindOfVisa"
                rules={{ required: true }}
                control={control}
                selectPlaceholder={formatMessage({
                  id:
                    'screen.visa.flightInformation.input.placeholder.kindOfVisa',
                })}
                search={false}
                data={[
                  {
                    label: formatMessage({
                      id:
                        'screen.visa.flightInformation.input.placeholder.kindOfVisa.option.one',
                    }),
                    value: 'SINGLE_ENTRY',
                  },
                  {
                    label: formatMessage({
                      id:
                        'screen.visa.flightInformation.input.placeholder.kindOfVisa.option.two',
                    }),
                    value: 'MULTIPLE_ENTRY',
                  },
                ]}
              />
              <Spacer />
              <Text variant="labelMedium">
                {formatMessage({
                  id:
                    'screen.visa.flightInformation.input.placeholder.recipientSameAsApplicant',
                })}
              </Text>

              <CustomDropdown
                name="recipientSameAsApplicant"
                rules={{ required: true }}
                control={control}
                selectPlaceholder={formatMessage({
                  id:
                    'screen.visa.flightInformation.input.placeholder.recipientSameAsApplicant',
                })}
                search={false}
                data={[
                  {
                    label: formatMessage({
                      id: 'general.yes',
                    }),
                    value: true,
                  },
                  {
                    label: formatMessage({
                      id: 'general.no',
                    }),
                    value: false,
                  },
                ]}
              />
              {(!watch('recipientSameAsApplicant')?.value ||
                item?.invoiceRecipientSameAsApplicant) && (
                <View>
                  <CustomTextInput
                    control={control}
                    name="invoiceAddress"
                    placeholder={formatMessage({
                      id:
                        'screen.visa.flightInformation.input.placeholder.invoiceAddress',
                    })}
                  />
                </View>
              )}
            </View>
          </Wrapper>
        </ScrollView>
        <Card mode="elevated" style={{ backgroundColor: 'white' }}>
          <Card.Content>
            <PrimaryButton
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            >
              {formatMessage({ id: 'button.submit' })}
            </PrimaryButton>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};
