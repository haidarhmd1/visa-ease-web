import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BackButton as BackButtonIcon } from 'assets/images';

export const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack}>
    <Image style={styles.image} source={BackButtonIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  image: {
    marginTop: 25,
    marginLeft: 15,
    width: 24,
    height: 24,
  },
});
