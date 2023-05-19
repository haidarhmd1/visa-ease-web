import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Spacer } from 'components/Layout/Layout';
import { useIntl } from 'react-intl';
import { Text } from 'react-native-paper';
import { PalmImage } from 'assets/images';
import { StickyHeaderWrapper } from 'components/StickyHeaderWrapper';
import { WorldIllustration } from 'assets/illustrations';
import { VisaApplyButton } from 'screens/Visa/VisaApplyButton';
import { VisaIconWrapper } from 'screens/Visa/VisaIconWrapper';
import { VisaFloatingCardContent } from 'screens/Visa/VisaFloatingCardContent';
import { SpacerDivider } from 'components/SpacerDivider';
import { VisaSelectCountryModal } from './VisaSelectCountryModal';
import { VisaApplicationList } from '../../components/VisaApplicationList';

export const Visa = ({ navigation }) => {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = useState(false);

  return (
    <StickyHeaderWrapper
      showBackButton={false}
      appBarTitle={formatMessage({ id: 'visastar.home.services.visa' })}
      imageSrc={PalmImage}
      navigation={navigation}
      floatingCardContent={<VisaFloatingCardContent />}
    >
      <Layout style={styles.margin}>
        <View>
          <Text variant="headlineSmall">
            {formatMessage({ id: 'screen.visa.keepReady.title' })}
          </Text>
        </View>
        <Spacer />
        <VisaIconWrapper />
        <VisaApplicationList
          title="screen.visa.visaApplicationList.title"
          navigation={navigation}
        />
        <SpacerDivider />
        <VisaApplyButton
          setVisible={setVisible}
          imageSrc={WorldIllustration}
          title={formatMessage({ id: 'screen.visa.applyCard.title' })}
          description={formatMessage({ id: 'screen.main.startVisaJourney' })}
        />
      </Layout>

      <VisaSelectCountryModal visible={visible} setVisible={setVisible} />
    </StickyHeaderWrapper>
  );
};

const styles = StyleSheet.create({
  margin: { marginTop: 75, marginBottom: 75 },
});
