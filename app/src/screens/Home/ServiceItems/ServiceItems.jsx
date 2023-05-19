/* eslint-disable sonarjs/no-identical-functions */
import React from 'react';
import {
  View,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import { useIntl } from 'react-intl';
import { ROUTES } from 'helpers/constants/routes';
import { Divider, List, Text } from 'react-native-paper';
import { PriceTag } from 'assets/icons';
import { colorPalette } from 'styles/theme/theme.extended';
import { SpacerDivider } from 'components/SpacerDivider';

const externalLink = url => {
  Linking.openURL(url).catch(error => {
    console.error('Failed opening page because:', error);
    alert('Failed to open page');
  });
};
const services = [
  {
    id: 1,
    title: 'visastar.home.services.visa',
    route: ROUTES.VISA_HOME,
    icon: 'file-document-multiple-outline',
  },
];

const externalServices = [
  {
    id: 2,
    title: 'visastar.home.services.legalization',
    route: ROUTES.LEGALIZATION,
    icon: 'file-document-multiple-outline',
  },
  {
    id: 3,
    title: 'visastar.home.services.translations',
    route: ROUTES.TRANSLATION,
    icon: 'translate',
  },
  {
    id: 4,
    title: 'visastar.home.services.prices',
    route: ROUTES.RATES,
    icon: PriceTag,
  },
];

export const ServiceItems = ({ navigation }) => {
  const { formatMessage } = useIntl();

  const onPressRouteNavigationHandler = route => {
    navigation.navigate(route);
  };

  return (
    <View>
      <Text variant="titleLarge" style={{ paddingBottom: 16 }}>
        {formatMessage({ id: 'screen.main.services' })}
      </Text>

      <FlatList
        horizontal
        data={services}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingBottom: 25,
        }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            screenWidth={Dimensions.get('window')}
            onPress={() => {
              onPressRouteNavigationHandler(item.route);
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 5,
                height: 75,
                width: 120,
                marginRight: 10,
                marginLeft: 10,
                borderRadius: 14,
                backgroundColor: colorPalette.gray.g100,
              }}
            >
              <List.Icon
                icon={item.icon}
                style={{
                  justifyContent: 'center',
                  marginTop: 7,
                }}
              />
              <Text
                variant="labelMedium"
                style={{ marginTop: 'auto', textAlign: 'center' }}
              >
                {formatMessage({
                  id: item.title,
                })}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={item => item.id}
      />
      <Text variant="titleLarge" style={{ paddingBottom: 16 }}>
        {formatMessage({ id: 'screen.main.externalServices' })}
      </Text>
      <FlatList
        horizontal
        data={externalServices}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingBottom: 25,
        }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            screenWidth={Dimensions.get('window')}
            onPress={() => {
              onPressRouteNavigationHandler(item.route);
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 5,
                height: 75,
                width: 120,
                marginRight: 10,
                marginLeft: 10,
                borderRadius: 14,
                backgroundColor: colorPalette.gray.g100,
              }}
            >
              <List.Icon
                icon={item.icon}
                style={{
                  justifyContent: 'center',
                  marginTop: 7,
                }}
              />
              <Text
                variant="labelMedium"
                style={{ marginTop: 'auto', textAlign: 'center' }}
              >
                {formatMessage({
                  id: item.title,
                })}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
