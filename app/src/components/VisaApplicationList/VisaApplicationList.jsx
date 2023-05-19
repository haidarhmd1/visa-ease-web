import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Spacer } from 'components/Layout/Layout';
import { useIntl } from 'react-intl';
import { ActivityIndicator, Badge, List, Text } from 'react-native-paper';

import { SpacerDivider } from 'components/SpacerDivider';
import { useQuery } from 'react-query';
import { getAllVisaApplicationByUser } from 'services/api';
import { MyTheme } from 'styles/theme/theme.extended';
import { AntDesign } from '@expo/vector-icons';
import { ROUTES } from 'helpers/constants/routes';
import { useVisaStatus } from 'utils/useVisaStatus';
import { badgeProcess } from 'utils/BadgeStatus';
import { useRefreshOnFocus } from 'utils/useRefetchOnFocus';

export const VisaApplicationList = ({ title, navigation }) => {
  const { visaStatus } = useVisaStatus();
  const { formatMessage } = useIntl();

  const { data: visaApplications, refetch, isLoading, isError } = useQuery(
    'getAllVisaApplications',
    getAllVisaApplicationByUser
  );
  useRefreshOnFocus(refetch);
  if (isError) {
    Alert.alert(formatMessage({ id: 'general.error.get.message' }));
  }

  if (isLoading) return <ActivityIndicator size="large" />;

  const moveToVisaScreenHandler = visaId => {
    navigation.navigate(ROUTES.VISA_APP, {
      visaId,
    });
  };

  return (
    <View>
      <SpacerDivider />
      <Text variant="bodyLarge">{formatMessage({ id: title })}</Text>
      <Spacer />
      {visaApplications?.data.length > 0 ? (
        visaApplications.data.map(applications => (
          <List.Item
            key={applications.id}
            style={[styles.padding, styles.list]}
            onPress={() => moveToVisaScreenHandler(applications.id)}
            title={applications.country.toUpperCase()}
            description={
              <View>
                <Text style={styles.marginTop}>
                  {visaStatus(applications.status)}
                </Text>
                {applications.status === 'CANCELLED' && (
                  <Text variant="labelSmall" style={styles.secondaryFontColor}>
                    {formatMessage({
                      id: 'screen.visa.visaApplicationList.revoke.description',
                    })}
                  </Text>
                )}
              </View>
            }
            // eslint-disable-next-line react/no-unstable-nested-components
            left={() => (
              <Badge style={styles.badgeStyle(applications)} size={8} />
            )}
            // eslint-disable-next-line react/no-unstable-nested-components
            right={() => (
              <AntDesign style={styles.alignCenter} name="right" size={14} />
            )}
          />
        ))
      ) : (
        <List.Item
          style={[styles.padding, styles.list]}
          title={formatMessage({ id: 'screen.visa.visaApplicationList.title' })}
          description={formatMessage({ id: 'visa.list.noVisaInProgress' })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  padding: {
    padding: 16,
  },
  marginTop: {
    marginTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: MyTheme.colors.primaryBrand,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'space-between',
  },
  cardContentTextArrow: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  alignCenter: {
    alignSelf: 'center',
  },
  marginRight: {
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    borderWidth: 1,
    marginBottom: 8,
    borderColor: MyTheme.colors.primaryBrand,
    borderRadius: 12,
  },
  secondaryFontColor: { color: '#808080' },
  badgeStyle: applications => {
    return {
      backgroundColor: badgeProcess(applications.status),
      alignSelf: 'center',
    };
  },
});
