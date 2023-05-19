import React, { useContext } from 'react';

import { ROUTES } from 'helpers/constants/routes';
import { Profile, VisaApplication } from 'screens';
import { noHeader } from 'utils/screenOptions';
import { Legalization } from 'screens/Legalization';
import { Translation } from 'screens/Translation';
import { Rates } from 'screens/Rates';
import { FlightInformation } from 'screens/VisaApplication/Form/FlightInformation';
import { Passport } from 'screens/VisaApplication/Form/Passport';
import { ResidencePermit } from 'screens/VisaApplication/Form/ResidencePermit';
import { BiometricImage } from 'screens/VisaApplication/Form/BiometricImage';
import { PersonalInformation } from 'screens/Profile/ProfileDetails/PersonalInformation';
import { AddressInformation } from 'screens/Profile/ProfileDetails/AddressInformation';
import { LoginInformation } from 'screens/Profile/ProfileDetails/LoginInformation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContext from 'provider/AuthProvider';
import { useQuery } from 'react-query';
import { getUser } from 'services/api';
import { ActivityIndicator } from 'react-native-paper';
import { MainTabScreen } from './TabStack';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  const { logout, setUserData } = useContext(AuthContext);

  const { data, isLoading, isError } = useQuery('getUser', getUser);

  if (isError) logout();

  if (isLoading) return <ActivityIndicator animating size="large" />;

  setUserData(data?.data);

  return (
    <Stack.Navigator
      screenOptions={{
        ...noHeader,
      }}
      initialRouteName={ROUTES.HOME_TAB_SCREEN}
    >
      <Stack.Group>
        <Stack.Screen name={ROUTES.HOME_TAB_SCREEN} component={MainTabScreen} />
        <Stack.Group>
          <Stack.Screen name={ROUTES.LEGALIZATION} component={Legalization} />
          <Stack.Screen name={ROUTES.TRANSLATION} component={Translation} />
          <Stack.Screen name={ROUTES.RATES} component={Rates} />
          <Stack.Screen name={ROUTES.VISA_APP} component={VisaApplication} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name={ROUTES.VISA_INFORMATION.flightInformation}
            component={FlightInformation}
          />
          <Stack.Screen
            name={ROUTES.VISA_INFORMATION.passportPicture}
            component={Passport}
          />
          <Stack.Screen
            name={ROUTES.VISA_INFORMATION.residencePermit}
            component={ResidencePermit}
          />
          <Stack.Screen
            name={ROUTES.VISA_INFORMATION.biometricImage}
            component={BiometricImage}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name={ROUTES.PROFILE_EDIT.personalInformation}
            component={PersonalInformation}
          />
          <Stack.Screen
            name={ROUTES.PROFILE_EDIT.addressInformation}
            component={AddressInformation}
          />
          <Stack.Screen
            name={ROUTES.PROFILE_EDIT.loginInformation}
            component={LoginInformation}
          />
        </Stack.Group>
      </Stack.Group>
    </Stack.Navigator>
  );
};
