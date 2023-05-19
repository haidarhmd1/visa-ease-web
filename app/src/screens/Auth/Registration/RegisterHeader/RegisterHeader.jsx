import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { PlaneStartingIllustration } from 'assets/illustrations';
import { Spacer } from 'components/Layout/Layout';
import React from 'react';
import { useIntl } from 'react-intl';

const blurhash = '00Q12z';
export const RegisterHeader = () => {
  const { formatMessage } = useIntl();
  return (
    <View>
      <Text
        variant="bodyLarge"
        style={{ fontWeight: 'bold', textAlign: 'center' }}
      >
        {formatMessage({ id: 'registration.screen.title' })}
      </Text>
      <View style={{ alignSelf: 'center' }}>
        <Image
          style={style.image}
          source={PlaneStartingIllustration}
          placeholder={blurhash}
          contentFit="contain"
          transition={1000}
        />
      </View>
      <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
        {formatMessage({ id: 'registration.screen.subtitle' })}
      </Text>
      <Spacer />
      <Text variant="bodyMedium">
        {formatMessage({ id: 'registration.screen.description' })}
      </Text>
      <Spacer />
    </View>
  );
};
const style = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
  },
});
