import React from 'react';
import { useIntl } from 'react-intl';
import { Alert } from 'react-native';
import { DangerButton } from 'components/Buttons';
import { useMutation, useQueryClient } from 'react-query';
import { updateVisaApplication } from 'services/api';

export const CancelVisa = ({ navigation, route }) => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const { visaId } = route.params;
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: data => updateVisaApplication(data, visaId),
  });

  const submitVisaProcess = () => {
    Alert.alert(
      formatMessage({ id: 'general.cancel' }),
      formatMessage({ id: 'general.cancelConfirmation' }),
      [
        {
          text: formatMessage({ id: 'general.yes' }),
          onPress: () => {
            mutate({ status: 'CANCELLED' });
            setTimeout(() => {
              queryClient.invalidateQueries('getAllVisaApplications');
              navigation.goBack();
            }, 800);
          },
        },
        {
          text: formatMessage({ id: 'general.no' }),
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  if (isError) {
    Alert.alert('Error', formatMessage({ id: 'general.error.message' }));
  }

  return (
    <DangerButton isLoading={isLoading} onPress={submitVisaProcess}>
      {formatMessage({ id: 'screen.visaApplication.cancel.visa' })}
    </DangerButton>
  );
};
