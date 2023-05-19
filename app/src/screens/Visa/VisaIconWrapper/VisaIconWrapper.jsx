import React from 'react';
import { View } from 'react-native';
import { IconView } from 'components/IconView';
import { useIntl } from 'react-intl';

export const VisaIconWrapper = () => {
  const { formatMessage } = useIntl();
  return (
    <View
      style={{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      <IconView
        icon="passport"
        size={48}
        title={formatMessage({ id: 'general.passportPicture' })}
      />
      <IconView
        icon="airplane-marker"
        size={48}
        title={formatMessage({ id: 'general.residencePermit' })}
      />
      <IconView
        icon="file-document-edit-outline"
        size={48}
        title={formatMessage({ id: 'general.biometricImage' })}
      />
      <IconView
        icon="send-check"
        size={48}
        title={formatMessage({ id: 'general.healthInsurance' })}
      />
    </View>
  );
};
