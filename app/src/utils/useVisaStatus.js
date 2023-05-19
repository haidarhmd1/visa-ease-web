import React from 'react';
import { useIntl } from 'react-intl';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export const useVisaStatus = () => {
  const { formatMessage } = useIntl();

  const visaStatus = status => {
    const intlStatus = 'visaApplication.status';

    return (
      <View>
        <Text>{formatMessage({ id: `${intlStatus}.${status}` })}</Text>
      </View>
    );
  };
  return { visaStatus };
};
