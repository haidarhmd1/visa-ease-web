import React, { useContext } from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { noHeader } from 'utils/screenOptions';
import AuthContext from 'provider/AuthProvider';
import { MainStack } from './MainStack';
import { AuthStack } from './AuthStack';

const RootStackScreen = createNativeStackNavigator();

const RootStack = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" translucent={false} hidden={false} />
      <RootStackScreen.Navigator
        screenOptions={{
          ...noHeader,
        }}
      >
        {isAuthenticated ? (
          <RootStackScreen.Screen name="MAIN" component={MainStack} />
        ) : (
          <RootStackScreen.Screen name="AUTHENTICATION" component={AuthStack} />
        )}
      </RootStackScreen.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(RootStack);
