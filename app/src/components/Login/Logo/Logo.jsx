import { VisaStarLogo } from 'assets/images';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export const Logo = () => (
  <ImageBackground
    source={VisaStarLogo}
    resizeMode="contain"
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 64,
  },
});
