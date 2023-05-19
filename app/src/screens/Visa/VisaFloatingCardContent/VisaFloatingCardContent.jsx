import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import React from 'react';
import { useIntl } from 'react-intl';

export const VisaFloatingCardContent = () => {
  const { formatMessage } = useIntl();
  return (
    <View style={styles.marginTop}>
      <Card.Content>
        <Text variant="labelLarge" style={styles.fontBold}>
          {formatMessage({ id: 'screen.visa.floatingCard.title' })}
        </Text>
        <Text>
          {formatMessage({ id: 'screen.visa.floatingCard.description' })}
        </Text>
      </Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  fontBold: {
    fontWeight: 'bold',
  },
  marginTop: {
    marginTop: 14,
  },
});
