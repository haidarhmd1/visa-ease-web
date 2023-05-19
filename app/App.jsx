/* eslint-disable global-require */
import React, { useCallback, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { SafeAreaView } from 'react-native';
import {
  configureFonts,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';

import { themeStyle } from 'styles';

import RootStack from 'navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

import { getLanguage } from 'helpers/language';
import { messages } from 'helpers/locales/locales';
import { AuthProvider } from 'provider/AuthProvider';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const fontConfig = {
  ...MD3LightTheme,
  android: {
    regular: {
      fontFamily: 'Rajdhani-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Rajdhani-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Rajdhani-Light',
      fontWeight: 'light',
    },
    bold: {
      fontFamily: 'Rajdhani-Bold',
      fontWeight: 'bold',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Rajdhani-Regular',
      fontWeight: '500',
    },
    medium: {
      fontFamily: 'Rajdhani-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Rajdhani-Light',
      fontWeight: 'light',
    },
    bold: {
      fontFamily: 'Rajdhani-Bold',
      fontWeight: 'bold',
    },
  },
};

const theme = {
  fonts: configureFonts({ config: fontConfig, isV3: true }),
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = Font.useFonts({
    'Rajdhani-Medium': require('./src/assets/fonts/Rajdhani-Medium.ttf'),
    'Rajdhani-Bold': require('./src/assets/fonts/Rajdhani-Bold.ttf'),
    'Rajdhani-Regular': require('./src/assets/fonts/Rajdhani-Regular.ttf'),
    'Rajdhani-Light': require('./src/assets/fonts/Rajdhani-Light.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          ...Entypo.font,
          ...AntDesign.font,
          ...Fontisto.font,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) return null;

  return (
    <SafeAreaView style={themeStyle.container} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <IntlProvider
            locale={getLanguage()}
            messages={messages[getLanguage()]}
            wrapRichTextChunksInFragment
          >
            <AuthProvider>
              <RootStack />
            </AuthProvider>
          </IntlProvider>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}
