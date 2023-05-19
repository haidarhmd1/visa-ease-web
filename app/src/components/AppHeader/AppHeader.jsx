import React, { useContext } from 'react';

import { ActivityIndicator, Appbar, Text } from 'react-native-paper';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { useIntl } from 'react-intl';
import AuthContext from 'provider/AuthProvider';

export const AppHeader = ({
  goBack = () => {},
  showBackButton = true,
  title,
  role,
}) => {
  const { formatMessage } = useIntl();
  const { userData, logout } = useContext(AuthContext);

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

  if (!userData) return <ActivityIndicator animating size="large" />;

  if (role === 'main') {
    return (
      <Appbar.Header
        statusBarHeight={0}
        style={[styles.backgroundWhite, { marginBottom: 8 }]}
      >
        <View>
          <Text style={styles.mainAppHeaderText} variant="headlineSmall">
            {formatMessage({ id: 'screen.main.greeting' })}
          </Text>
          <Text
            style={[styles.mainAppHeaderText, styles.fontWeightBold]}
            variant="headlineMedium"
          >
            {userData?.fullname}
          </Text>
        </View>
        <View style={styles.mainAppHeaderActionContainer}>
          <Appbar.Action icon="logout" onPress={logoutUser} />
        </View>
      </Appbar.Header>
    );
  }

  if (role === 'secondary') {
    return (
      <Appbar.Header style={styles.secondaryAppHeaderContainer}>
        {showBackButton && (
          <Appbar.Action
            icon="arrow-left"
            onPress={goBack}
            style={styles.backgroundWhite}
          />
        )}
        <Appbar.Content
          title={title}
          color="white"
          titleStyle={styles.colorWhite}
        />
      </Appbar.Header>
    );
  }

  return (
    <Appbar.Header statusBarHeight={0} style={styles.backgroundWhite}>
      {showBackButton && <Appbar.Action icon="arrow-left" onPress={goBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: 'white',
  },
  mainAppHeaderText: { paddingLeft: 16 },
  fontWeightBold: { fontWeight: 'bold' },
  mainAppHeaderActionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  secondaryAppHeaderContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    zIndex: 1,
  },
  colorWhite: {
    color: 'white',
  },
});
