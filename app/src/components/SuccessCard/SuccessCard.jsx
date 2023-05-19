import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MyTheme } from 'styles/theme/theme.extended';

export const SuccessCard = ({ successMsg, children }) => {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content>
        <Text style={styles.textStyle}>{successMsg}</Text>
        {children}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: MyTheme.colors.primaryBrandBackground,
    marginBottom: 24,
  },
  textStyle: { color: 'white', fontWeight: 'bold' },
});
