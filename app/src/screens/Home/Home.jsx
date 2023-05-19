import React from 'react';
import { AppHeader } from 'components/AppHeader';
import { Layout, StyledScrollView } from 'components/Layout/Layout';
import { TouchableWithoutFeedback, View } from 'react-native';
import { HomeHeroView } from 'screens/Home/HomeHeroView';
import { VisaApplicationList } from 'components/VisaApplicationList';
import { ServiceItems } from './ServiceItems';

export const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader navigation={navigation} role="main" />
      <HomeHeroView />
      <StyledScrollView>
        <TouchableWithoutFeedback>
          <Layout style={{ marginBottom: 64 }}>
            <ServiceItems navigation={navigation} />
            <VisaApplicationList
              title="home.visa.history.title"
              navigation={navigation}
            />
          </Layout>
        </TouchableWithoutFeedback>
      </StyledScrollView>
    </View>
  );
};
