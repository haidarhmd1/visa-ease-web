import React from 'react';
import { SecondaryButton } from 'components/Buttons';
import { Text } from 'react-native-paper';
import { useIntl } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { updateVisaApplication } from 'services/api';
import { Alert } from 'react-native';

export const RevokeVisa = ({
  navigation,
  visaId,
  isVisaApplicationComplete,
}) => {
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: data => updateVisaApplication(data, visaId),
  });

  const onRevokeVisaButton = () => {
    Alert.alert(
      formatMessage({ id: 'general.revokeVisa.prompt.title' }),
      formatMessage({ id: 'general.revokeVisa.prompt.description' }),
      [
        {
          text: formatMessage({ id: 'general.revokeVisa.prompt.title' }),
          onPress: () => {
            mutate({
              status: isVisaApplicationComplete ? 'PENDING' : 'IN_PROGRESS',
            });
            queryClient.invalidateQueries('getAllVisaApplications');
            setTimeout(() => {
              navigation.goBack();
            }, 800);
          },
        },
        {
          text: formatMessage({ id: 'general.cancel' }),
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
    <SecondaryButton onPress={onRevokeVisaButton} isLoading={isLoading}>
      <Text>Revoke Visa</Text>
    </SecondaryButton>
  );
};
