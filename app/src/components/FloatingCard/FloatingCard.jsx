import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { themeStyle } from 'styles';

export const FloatingCard = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <Card mode="contained" style={[themeStyle.shadow, styles.card]}>
        {children}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 175,
    width: Dimensions.get('window').width,
  },
  card: {
    height: 140,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: 'white',
  },
});
