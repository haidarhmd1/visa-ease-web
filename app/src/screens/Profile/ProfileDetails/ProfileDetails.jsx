import React from 'react';
import { Divider, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from 'helpers/constants/routes';
import { StyleSheet, View } from 'react-native';
import { ProfileEditIllustration } from 'assets/illustrations';
import { Image } from 'expo-image';
import { blurhash } from 'helpers/constants/global';
import { useIntl } from 'react-intl';

const leftIcon = icon => <List.Icon icon={icon} />;

export const ProfileDetails = () => {
  const { formatMessage } = useIntl();
  const navigation = useNavigation();

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.image}
          source={ProfileEditIllustration}
          placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />
      </View>
      <View>
        <View style={styles.layoutView}>
          <View>
            <List.Section>
              <List.Item
                style={{ padding: 12 }}
                title={formatMessage({ id: 'register.title.loginInformation' })}
                left={() => leftIcon('login')}
                onPress={() => {
                  navigation.navigate(ROUTES.PROFILE_EDIT.loginInformation);
                }}
              />
              <Divider />
              <List.Item
                style={{ padding: 12 }}
                onPress={() => {
                  navigation.navigate(ROUTES.PROFILE_EDIT.personalInformation);
                }}
                title={formatMessage({
                  id: 'register.title.personalInformation',
                })}
                left={() => leftIcon('account-arrow-right-outline')}
              />
              <Divider />
              <List.Item
                style={{ padding: 12 }}
                onPress={() => {
                  navigation.navigate(ROUTES.PROFILE_EDIT.addressInformation);
                }}
                title={formatMessage({
                  id: 'register.title.addressInformation',
                })}
                left={() => leftIcon('location-enter')}
              />
            </List.Section>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutView: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  image: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
  },
});
