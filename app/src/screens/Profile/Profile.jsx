import React, { useContext } from 'react';
import { Layout, StyledScrollView } from 'components/Layout/Layout';
import { Alert, View } from 'react-native';
import { AppHeader } from 'components/AppHeader';
import { useIntl } from 'react-intl';
import { DangerButton } from 'components/Buttons';
import { useNavigation } from '@react-navigation/native';
import AuthContext from 'provider/AuthProvider';
import { ProfileDetails } from './ProfileDetails';

export const Profile = () => {
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const logoutUser = () => {
    Alert.alert(
      formatMessage({ id: 'button.logout' }),
      formatMessage({ id: 'general.logoutConfirmation' }),
      [
        {
          text: formatMessage({ id: 'general.yes' }),
          onPress: () => {
            logout();
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

  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        goBack={() => navigation.goBack()}
        title={formatMessage({ id: 'screen.profile.title' })}
      />
      <StyledScrollView>
        <Layout>
          <ProfileDetails />
          <DangerButton onPress={logoutUser}>
            {formatMessage({ id: 'button.logout' })}
          </DangerButton>
        </Layout>
      </StyledScrollView>
    </View>
  );
};
