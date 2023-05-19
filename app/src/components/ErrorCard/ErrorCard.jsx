import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MyTheme } from 'styles/theme/theme.extended';

export const ErrorCard = ({ errMessage }) => {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content>
        <Text style={styles.textStyle}>{errMessage}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: MyTheme.colors.error,
    marginBottom: 24,
  },
  textStyle: { color: 'white', fontWeight: 'bold' },
});
