import React, { useState } from 'react';
import { PrimaryButton } from 'components/Buttons';
import { View } from 'react-native';
import { useIntl } from 'react-intl';
import { AgreeTermsModal } from './AgreeTermsModal';

export const SubmitVisa = ({
  navigation,
  isCancelled,
  visaId,
  isVisaApplicationComplete,
}) => {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <PrimaryButton
        disabled={!isVisaApplicationComplete || isCancelled}
        onPress={() => setVisible(true)}
      >
        {formatMessage({ id: 'button.submit' })}
      </PrimaryButton>
      <AgreeTermsModal
        navigation={navigation}
        visaId={visaId}
        visible={visible}
        setVisible={setVisible}
      />
    </View>
  );
};
