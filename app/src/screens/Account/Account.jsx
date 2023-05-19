import React from 'react';
import { AppHeader } from 'components/AppHeader';
import { ScrollView, View } from 'react-native';
import { Layout, StyledCard } from 'components/Layout/Layout';
import { useIntl } from 'react-intl';
import { ProfileOverview } from './ProfileOverview';
import { AccountLinks } from './AccountLinks';
import { ContactLinks } from './ContactLinks';
import { SocialMediaLinks } from './SocialMediaLinks';
import { AccountDelete } from './AccountDelete';

export const Account = ({ navigation }) => {
  const { formatMessage } = useIntl();

  return (
    <View>
      <AppHeader
        showBackButton={false}
        title={formatMessage({ id: 'screen.account.title' })}
      />
      <ScrollView>
        <Layout style={{ marginBottom: 128 }}>
          <ProfileOverview navigation={navigation} />
          <AccountLinks />
          <ContactLinks />
          <SocialMediaLinks />
          <StyledCard>
            <AccountDelete />
          </StyledCard>
        </Layout>
      </ScrollView>
    </View>
  );
};
